# Appassionata Music School - Website Redesign TODO

## Completed Features
- [x] Website redesign with Cream White aesthetic (#FAF7F2 background, deep brown text, gold accents)
- [x] Original Vimeo video embedded in hero section
- [x] Real faculty photos integrated from original website
- [x] Full-stack booking system (lesson and practice room bookings)
- [x] Database integration for storing bookings
- [x] Booking modal with teacher pre-selection from instrument cards
- [x] Back button functionality in booking modal
- [x] Navigation between booking types (lessons vs practice rooms)
- [x] Practice Rooms and Performance Space image galleries (3 photos for Practice Rooms, 1 for Performance Space)
- [x] Instagram link connected to official account
- [x] Hero section redesigned with large logo, Fairfax location, and tagline hierarchy
- [x] All 23 unit tests passing
- [x] Responsive design across all sections

## In Progress / Pending

### P0 Priority (Blocking)
- [ ] Practice room self-booking system with private link
  - [ ] 3-day advance booking window
  - [ ] 2-hour per person per day limit
  - [ ] Real-time slot locking (conflict prevention)
  - [ ] Admin view for all bookings
  - [ ] Private URL access (no login required)

### P1 Priority (This Week)
- [ ] Lesson format restructure (DEFERRED - per user request)
  - [ ] Add Private (1-on-1) format option
  - [ ] Add Semi-private (2 students) format option
  - [ ] Add Group (3+ students) format option
  - [ ] Add Basic/Beginner and Advanced skill levels
- [x] Payment information section
  - [x] Display trial lesson contact info
  - [x] Show flexible pricing message
  - [x] Link to email for pricing details
- [ ] Add vocal teacher profile to Faculty section
  - [ ] Awaiting content from Michelle

### P2 Priority (2-3 Weeks)
- [x] Events section
  - [x] Upcoming events (East Meets West Spring Concert 2025)
  - [x] Past events gallery with descriptions
- [ ] Hire Our Musicians section
  - [ ] Musician profiles for event bookings
  - [ ] Contact form for inquiries
- [ ] DNS migration to point amusicva.com to new website (requires Norman's approval)

## Technical Notes
- ✅ SMTP configuration complete - emails send successfully
- ✅ Email tests mocked to prevent test emails
- Images are sourced from original website's zyrosite CDN
- All booking data is stored in database with proper validation
- Owner notifications sent via Manus notification API
- Practice room booking system will use private URL (no login required)
- Payment system: Phase 1 static display, Phase 2 Stripe integration
