import { useState } from "react";
import { X, Play } from "lucide-react";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  eventType: "performance" | "activity" | "workshop" | "recital" | "other";
  instruments: string[]; // e.g., ["piano", "violin", "flute"]
}

interface CategorizedEventGalleryProps {
  items: GalleryItem[];
  colors?: {
    bg: string;
    card: string;
    border: string;
    text: string;
    textMid: string;
    muted: string;
    accent: string;
    white: string;
  };
}

const EVENT_TYPE_LABELS: Record<string, string> = {
  performance: "Performance",
  activity: "Activity",
  workshop: "Workshop",
  recital: "Recital",
  other: "Other",
};

export function CategorizedEventGallery({ items, colors }: CategorizedEventGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeEventType, setActiveEventType] = useState<string | null>(null);
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);

  const C = colors || {
    bg: "#FAF7F2",
    card: "#F2EDE4",
    border: "#D4C5A9",
    text: "#2C1A0E",
    textMid: "#5C3D20",
    muted: "#8B7355",
    accent: "#B8860B",
    white: "#FDFCF9",
  };

  // Get unique event types and instruments
  const eventTypes = Array.from(new Set(items.map((item) => item.eventType)));
  const allInstruments = Array.from(
    new Set(items.flatMap((item) => item.instruments))
  ).sort();

  // Filter items based on active filters
  const filteredItems = items.filter((item) => {
    const matchesEventType = !activeEventType || item.eventType === activeEventType;
    const matchesInstrument =
      !activeInstrument || item.instruments.includes(activeInstrument);
    return matchesEventType && matchesInstrument;
  });

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Filter Buttons */}
      <div className="mb-12">
        {/* Event Type Filters */}
        <div className="mb-8">
          <h4 className="font-display text-sm mb-4" style={{ color: C.text, fontWeight: 500 }}>
            Filter by Event Type
          </h4>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveEventType(null)}
              className="px-4 py-2 rounded text-sm font-medium transition-all duration-200"
              style={{
                background: !activeEventType ? C.accent : C.card,
                color: !activeEventType ? C.white : C.text,
                border: `1px solid ${C.border}`,
              }}
            >
              All Events
            </button>
            {eventTypes.map((eventType) => (
              <button
                key={eventType}
                onClick={() => setActiveEventType(eventType)}
                className="px-4 py-2 rounded text-sm font-medium transition-all duration-200"
                style={{
                  background: activeEventType === eventType ? C.accent : C.card,
                  color: activeEventType === eventType ? C.white : C.text,
                  border: `1px solid ${C.border}`,
                }}
              >
                {EVENT_TYPE_LABELS[eventType] || eventType}
              </button>
            ))}
          </div>
        </div>

        {/* Instrument Filters */}
        <div>
          <h4 className="font-display text-sm mb-4" style={{ color: C.text, fontWeight: 500 }}>
            Filter by Instrument
          </h4>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveInstrument(null)}
              className="px-4 py-2 rounded text-sm font-medium transition-all duration-200"
              style={{
                background: !activeInstrument ? C.accent : C.card,
                color: !activeInstrument ? C.white : C.text,
                border: `1px solid ${C.border}`,
              }}
            >
              All Instruments
            </button>
            {allInstruments.map((instrument) => (
              <button
                key={instrument}
                onClick={() => setActiveInstrument(instrument)}
                className="px-4 py-2 rounded text-sm font-medium transition-all duration-200 capitalize"
                style={{
                  background: activeInstrument === instrument ? C.accent : C.card,
                  color: activeInstrument === instrument ? C.white : C.text,
                  border: `1px solid ${C.border}`,
                }}
              >
                {instrument}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6" style={{ color: C.muted, fontSize: "0.9rem" }}>
        Showing {filteredItems.length} of {items.length} items
      </div>

      {/* Gallery Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="reveal group relative overflow-hidden rounded cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                aspectRatio: "16/9",
              }}
            >
              {/* Thumbnail/Preview */}
              <img
                src={
                  item.type === "video"
                    ? item.thumbnail || `https://img.youtube.com/vi/${extractVideoId(item.url)}/0.jpg`
                    : item.url
                }
                alt={item.title}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                {item.type === "video" ? (
                  <Play size={48} color="white" fill="white" />
                ) : (
                  <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 600 }}>
                    View
                  </div>
                )}
              </div>

              {/* Title Badge */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent"
                style={{ color: "white" }}
              >
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{ background: "rgba(255,255,255,0.3)", color: "white" }}
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <p style={{ color: C.muted, fontSize: "0.95rem" }}>
            No items match your filters. Try adjusting your selection.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {isOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.3s ease-out",
          }}
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 hover:bg-white/20"
              style={{ background: "rgba(0,0,0,0.5)", color: "white" }}
            >
              <X size={24} />
            </button>

            {/* Content */}
            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div style={{ background: "black", aspectRatio: "16/9" }}>
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  style={{ maxHeight: "90vh" }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Info */}
            {(selectedItem.title || selectedItem.description) && (
              <div
                className="p-4"
                style={{ background: C.card, borderTop: `1px solid ${C.border}` }}
              >
                <h3 className="font-display text-lg mb-2" style={{ color: C.text, fontWeight: 500 }}>
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "0.5rem" }}>
                    {selectedItem.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: `${C.accent}20`, color: C.accent }}
                  >
                    {EVENT_TYPE_LABELS[selectedItem.eventType]}
                  </span>
                  {selectedItem.instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="text-xs px-3 py-1 rounded-full capitalize"
                      style={{ background: `${C.accent}10`, color: C.text }}
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

// Helper function to extract video ID from URL
function extractVideoId(url: string): string {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (youtubeMatch) return youtubeMatch[1];
  return "";
}
