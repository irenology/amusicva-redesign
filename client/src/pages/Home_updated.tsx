// This is a temporary file to show the structure - will be integrated into Home.tsx

// Add this component before the Faculty function:

function HireMusiciansForm({ musician }: { musician: string }) {
  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    musicianPreference: musician,
    name: "",
    email: "",
    phone: "",
    additionalDetails: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email notification
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      eventType: "",
      eventDate: "",
      eventLocation: "",
      guestCount: "",
      musicianPreference: musician,
      name: "",
      email: "",
      phone: "",
      additionalDetails: "",
    });
  };

  return (
    <div>
      <h4 className="font-display text-xl mb-4" style={{ color: C.text, fontWeight: 500 }}>
        Hire {musician}
      </h4>

      {submitted && (
        <div
          className="p-4 rounded mb-4"
          style={{ background: `${C.accent}20`, border: `1px solid ${C.accent}` }}
        >
          <p style={{ color: C.accent, fontSize: "0.9rem", fontWeight: 500 }}>
            Thank you! We received your inquiry and will contact you soon.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Event Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${C.border}`,
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              color: C.text,
            }}
          >
            <option value="">Select an event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Private Concert">Private Concert</option>
            <option value="Party">Party</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Event Date (yyyy/mm/dd)
          </label>
          <input
            type="text"
            name="eventDate"
            placeholder="yyyy/mm/dd"
            value={formData.eventDate}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Event Location
          </label>
          <input
            type="text"
            name="eventLocation"
            placeholder="City, Venue"
            value={formData.eventLocation}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Guest Count
          </label>
          <input
            type="text"
            name="guestCount"
            placeholder="Approximate number of guests"
            value={formData.guestCount}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
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
          <label style={{ color: C.text, fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            Additional Details
          </label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            rows={3}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${C.border}`,
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              color: C.text,
              fontFamily: "inherit",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: C.accent,
            color: C.white,
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
