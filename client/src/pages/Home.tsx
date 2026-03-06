/* =============================================================
   HOME PAGE — CREAM (OPTION A) DESIGN
   Design: Warm cream/ivory background, deep brown text, gold/amber accents
   Fonts: Cormorant Garamond (display), Source Sans 3 (body), Outfit (UI)
   Colors:
     bg:      #FAF7F2 (warm cream)
     text:    #2C1A0E (deep brown)
     accent:  #B8860B (dark goldenrod)
     card:    #F2EDE4
     border:  #D4C5A9
     muted:   #8B7355
   ============================================================= */

import { useEffect, useState } from "react";
import { Menu, X, Music, MapPin, Clock, Mail, ChevronDown, Star } from "lucide-react";

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
          <a
            href="https://amusicva.com/book-here"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-sm px-5 py-2 rounded transition-all duration-200 hover:opacity-90"
            style={{ background: C.accent, color: C.white, fontWeight: 600, letterSpacing: "0.05em" }}
          >
            Book Now
          </a>
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
          <a
            href="https://amusicva.com/book-here"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-sm px-5 py-3 rounded text-center mt-2"
            style={{ background: C.accent, color: C.white, fontWeight: 600 }}
          >
            Book Now
          </a>
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
            boxShadow: `0 8px 40px ${C.accent}18`,
            position: "relative",
            paddingBottom: "56.25%",
            height: 0,
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=0&controls=1&loop=0&autopause=0&playsinline=1&muted=0`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Appassionata Music School"
          />
        </div>

        {/* Stats */}
        <div
          className="mt-14 pt-8 flex flex-wrap gap-10 justify-center"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          {[
            { value: "5", label: "World-Class Faculty" },
            { value: "5+", label: "Instruments Taught" },
            { value: "All", label: "Skill Levels Welcome" },
            { value: "Daily", label: "Practice Hours Available" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl" style={{ color: C.accent, fontWeight: 600 }}>
                {s.value}
              </div>
              <div
                className="font-ui text-xs tracking-wide mt-0.5"
                style={{ color: C.muted, letterSpacing: "0.05em" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown size={20} style={{ color: `${C.accent}80` }} />
      </div>
    </section>
  );
}

// ─── Vision Section ───────────────────────────────────────────
function Vision() {
  return (
    <section id="vision" className="py-28" style={{ background: C.bg }}>
      <div className="container">
        <Divider />
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <div
              className="font-ui text-xs tracking-widest uppercase mb-6"
              style={{ color: C.accent, letterSpacing: "0.2em" }}
            >
              Our Vision
            </div>
            <h2
              className="font-display mb-8 leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: C.text, fontWeight: 400 }}
            >
              More than a music school —
              <br />
              <span style={{ fontStyle: "italic", color: C.accent }}>a launchpad for life.</span>
            </h2>
            <div className="space-y-5 leading-relaxed" style={{ color: C.textMid, fontSize: "1.05rem", fontWeight: 300 }}>
              <p>
                At Appassionata Music School of VA, our instructors are professional musicians — many holding advanced degrees including doctorates and masters. Our faculty has performed on stages across{" "}
                <strong style={{ color: C.text, fontWeight: 500 }}>Europe, America, and Asia</strong>, bringing real-world, international experience directly into the classroom.
              </p>
              <p>
                We don't just teach notes and techniques. We teach{" "}
                <em style={{ color: C.text }}>confidence, stage presence, and the art of storytelling through music</em>.
              </p>
              <p>
                Our students gain ongoing live performance opportunities at community events, concerts, festivals, and competitions — building not just skill, but character.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                "How to perform with confidence",
                "How to express emotion through music",
                "How to practice and problem-solve",
                "How to collaborate and lead",
              ].map((v) => (
                <div
                  key={v}
                  className="flex items-start gap-3 p-4 rounded"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <Star size={13} className="mt-0.5 flex-shrink-0" style={{ color: C.accent }} />
                  <span className="font-ui text-sm leading-snug" style={{ color: C.muted, fontWeight: 300 }}>
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
                className="w-full rounded object-cover"
                style={{ height: "500px", filter: "brightness(0.95) contrast(1.02)" }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded -z-10"
                style={{ border: `1px solid ${C.accent}40` }}
              />
              {/* Quote overlay */}
              <div
                className="absolute bottom-6 left-6 right-6 p-5 rounded"
                style={{
                  background: `${C.white}EE`,
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <p className="font-display text-lg italic leading-snug" style={{ color: C.text, fontWeight: 400 }}>
                  "Appassionata transformed my musical journey with exceptional teachers and a supportive community."
                </p>
                <p className="font-ui text-xs mt-2 tracking-wide" style={{ color: C.accent, letterSpacing: "0.05em" }}>
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
    <section id="lessons" className="py-28" style={{ background: C.bgAlt }}>
      <div className="container">
        <Divider />
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image + CTA */}
          <div className="reveal lg:sticky lg:top-28">
            <img
              src={INSTRUMENTS_IMG}
              alt="Musical instruments"
              className="w-full rounded object-cover"
              style={{ height: "440px", filter: "brightness(0.95) contrast(1.02)" }}
            />
            <div
              className="mt-8 p-6 rounded"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <h3 className="font-display text-2xl mb-3" style={{ color: C.text, fontWeight: 500 }}>
                Individual & Group Lessons
              </h3>
              <p className="font-ui text-sm leading-relaxed mb-5" style={{ color: C.muted, fontWeight: 300 }}>
                Personalized one-on-one instruction tailored to your goals, or collaborative group sessions that build ensemble skills and musical community.
              </p>
              <a
                href="https://amusicva.com/book-here"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-sm px-6 py-3 rounded inline-block transition-all hover:opacity-90"
                style={{ background: C.accent, color: C.white, fontWeight: 600, letterSpacing: "0.05em" }}
              >
                Book a Lesson
              </a>
            </div>
          </div>

          {/* Instruments */}
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="font-ui text-xs tracking-widest uppercase mb-6" style={{ color: C.accent, letterSpacing: "0.2em" }}>
              Lessons
            </div>
            <h2
              className="font-display mb-10 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.text, fontWeight: 400 }}
            >
              Find your instrument,
              <br />
              <span style={{ fontStyle: "italic", color: C.accent }}>find your voice.</span>
            </h2>

            <div className="space-y-3">
              {instruments.map((inst, i) => (
                <div
                  key={inst.name}
                  className="p-5 rounded transition-all duration-300 group"
                  style={{
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    transitionDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${C.accent}60`;
                    (e.currentTarget as HTMLDivElement).style.background = C.card;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLDivElement).style.background = C.bg;
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{inst.icon}</span>
                    <div>
                      <h3 className="font-display text-xl mb-1" style={{ color: C.text, fontWeight: 500 }}>
                        {inst.name}
                      </h3>
                      <p className="font-ui text-sm leading-relaxed" style={{ color: C.muted, fontWeight: 300 }}>
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
    <section id="faculty" className="py-28" style={{ background: C.bg }}>
      <div className="container">
        <Divider />
        <div className="reveal mb-16">
          <div className="font-ui text-xs tracking-widest uppercase mb-6" style={{ color: C.accent, letterSpacing: "0.2em" }}>
            Our Faculty
          </div>
          <h2
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: C.text, fontWeight: 400 }}
          >
            World-class musicians.
            <br />
            <span style={{ fontStyle: "italic", color: C.accent }}>Dedicated teachers.</span>
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
                className="relative overflow-hidden rounded"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="relative overflow-hidden" style={{ paddingBottom: "125%" }}>
                  <img
                    src={f.unsplash}
                    alt={f.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(20%) brightness(0.95)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${C.accent}12` }}
                  />
                </div>
                <div className="p-4" style={{ background: C.card }}>
                  <h3 className="font-display text-lg leading-tight mb-1" style={{ color: C.text, fontWeight: 500 }}>
                    {f.name}
                  </h3>
                  <p className="font-ui text-xs tracking-wide" style={{ color: C.accent, letterSpacing: "0.05em" }}>
                    {f.instrument}
                  </p>
                </div>
              </div>

              {active === i && (
                <div
                  className="mt-2 p-4 rounded"
                  style={{ background: C.card, border: `1px solid ${C.accent}40` }}
                >
                  <p className="font-ui text-sm leading-relaxed" style={{ color: C.textMid, fontWeight: 300 }}>
                    {f.short}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center mt-8 font-ui text-sm" style={{ color: C.muted }}>
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
    <section id="spaces" className="py-28" style={{ background: C.bgAlt }}>
      <div className="container">
        <Divider />
        <div className="reveal mb-16">
          <div className="font-ui text-xs tracking-widest uppercase mb-6" style={{ color: C.accent, letterSpacing: "0.2em" }}>
            Our Spaces
          </div>
          <h2
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", color: C.text, fontWeight: 400 }}
          >
            Practice. Perform.
            <br />
            <span style={{ fontStyle: "italic", color: C.accent }}>Make it yours.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {spaces.map((space, i) => (
            <div
              key={space.title}
              className="reveal group rounded overflow-hidden"
              style={{ border: `1px solid ${C.border}`, transitionDelay: `${i * 0.12}s` }}
            >
              <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <img
                  src={space.img}
                  alt={space.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "brightness(0.9) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(44,26,14,0.5) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-5 left-6">
                  <h3 className="font-display text-3xl" style={{ color: C.white, fontWeight: 500 }}>
                    {space.title}
                  </h3>
                </div>
              </div>
              <div className="p-6" style={{ background: C.card }}>
                <p className="font-ui text-sm leading-relaxed mb-5" style={{ color: C.muted, fontWeight: 300 }}>
                  {space.desc}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {space.details.map((d) => (
                    <div key={d} className="flex items-center gap-2 font-ui text-xs" style={{ color: C.textMid }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.accent }} />
                      {d}
                    </div>
                  ))}
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
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "4px",
    border: `1px solid ${C.border}`,
    background: C.bg,
    color: C.text,
    fontFamily: "'Outfit', sans-serif",
    fontSize: "14px",
    fontWeight: 300,
    outline: "none",
  };

  return (
    <section id="contact" className="py-28" style={{ background: C.bg }}>
      <div className="container">
        <Divider />
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="reveal">
            <div className="font-ui text-xs tracking-widest uppercase mb-6" style={{ color: C.accent, letterSpacing: "0.2em" }}>
              Contact & Location
            </div>
            <h2
              className="font-display mb-8 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: C.text, fontWeight: 400 }}
            >
              Start your
              <br />
              <span style={{ fontStyle: "italic", color: C.accent }}>music journey today.</span>
            </h2>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: <MapPin size={16} style={{ color: C.accent }} />,
                  label: "Address",
                  content: (
                    <p className="font-ui text-sm leading-relaxed" style={{ color: C.textMid, fontWeight: 300 }}>
                      3911 Blenheim Blvd, Unit 43C<br />Fairfax, VA 22030
                    </p>
                  ),
                },
                {
                  icon: <Clock size={16} style={{ color: C.accent }} />,
                  label: "Hours",
                  content: (
                    <div className="font-ui text-sm leading-relaxed" style={{ color: C.textMid, fontWeight: 300 }}>
                      <p>Weekday Lessons: Mon–Fri, 2pm–9pm</p>
                      <p>Weekend Lessons: Sat–Sun, 10am–6pm</p>
                      <p>Practice Rooms: Daily, 6am–2am</p>
                    </div>
                  ),
                },
                {
                  icon: <Mail size={16} style={{ color: C.accent }} />,
                  label: "Online",
                  content: (
                    <a
                      href="https://amusicva.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-sm transition-colors"
                      style={{ color: C.accent, fontWeight: 400 }}
                    >
                      amusicva.com
                    </a>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}40` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-ui text-xs uppercase tracking-widest mb-1" style={{ color: C.accent, letterSpacing: "0.15em" }}>
                      {item.label}
                    </p>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://amusicva.com/book-here"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui inline-block px-8 py-3.5 rounded transition-all hover:opacity-90"
              style={{ background: C.accent, color: C.white, fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em" }}
            >
              Book a Lesson Online
            </a>
          </div>

          {/* Form */}
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
                      onFocus={(e) => (e.target.style.borderColor = `${C.accent}80`)}
                      onBlur={(e) => (e.target.style.borderColor = C.border)}
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
                    onFocus={(e) => (e.target.style.borderColor = `${C.accent}80`)}
                    onBlur={(e) => (e.target.style.borderColor = C.border)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded font-ui text-sm font-semibold transition-all hover:opacity-90 mt-2"
                  style={{ background: C.accent, color: C.white, letterSpacing: "0.05em" }}
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
              { label: "Book Online", href: "https://amusicva.com/book-here" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

// ─── Main Page ────────────────────────────────────────────────
export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
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
