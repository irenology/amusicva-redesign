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
- [x] Practice room self-booking system with private link
  - [x] 3-day advance booking window
  - [x] 2-hour per person per day limit
  - [x] Real-time slot locking (conflict prevention)
  - [x] Frontend calendar interface with date/time selection
  - [x] Booking confirmation emails
  - [ ] Admin view for all bookings (future enhancement)

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

### P2 Priority (2-3 Weeks) - COMPLETED ✅
- [x] Events section
  - [x] Upcoming events (East Meets West Spring Concert 2025)
  - [x] Past events gallery with descriptions
- [x] Hire Our Musicians section
  - [x] Musician profiles for event bookings
  - [x] Complete booking inquiry form with all fields
  - [x] Added "World-class musicians. Dedicated teachers." tagline
  - [x] Improved musician card styling with hover effects
  - [x] Vocal teacher placeholder (Michelle - Coming Soon)
  - [x] Integrated into Faculty section (removed standalone section)
  - [x] Form shows when clicking on faculty member avatar
  - [x] Bio and hire form displayed side-by-side in modal
- [x] Add "Book Practice Room" button to home page
  - [x] Link from Spaces section to /practice-room-booking
  - [x] Direct click on Practice Rooms card to booking page
- [x] Implement admin dashboard (placeholder)
  - [x] Access control (admin only)
  - [x] Route at /admin/dashboard
  - [ ] View all bookings (backend procedures needed)
  - [ ] Cancel/reschedule functionality (backend procedures needed)
  - [ ] Manage room availability (backend procedures needed)
- [x] Add vocal teacher profile (placeholder)
  - [x] Placeholder added to musicians array
  - [ ] Update with Michelle's actual content when provided
- [x] Implement Piano Practice Room Membership system
  - [x] Three membership tiers ($109/$159/$209/month)
  - [x] Membership hours restrictions
  - [x] Non-member hourly rate ($25/hour)
  - [x] Security deposit ($150) and ID verification
  - [x] Minimum 3-month commitment
- [x] Implement payment integration
  - [x] Zelle payment option
  - [x] Venmo payment option
  - [x] Cash payment option
  - [x] Payment info display with school email (appassionatava@gmail.com)
- [ ] DNS migration to point amusicva.com to new website (requires Norman's approval)

## Technical Notes
- ✅ SMTP configuration complete - emails send successfully
- ✅ Email tests mocked to prevent test emails
- ✅ Practice room booking system complete with conflict prevention
- Images are sourced from original website's zyrosite CDN
- All booking data is stored in database with proper validation
- Owner notifications sent via Manus notification API
- Practice room booking system uses private URL (no login required)
- Membership system: Requires payment integration (Stripe) for Phase 2
- Piano Practice Room Membership: 3 tiers with time-based access control


## Current Sprint (In Progress)

### Practice Room Booking Modal (Spaces Section)
- [ ] Add "Book a Practice Room" button to Practice Rooms card in Spaces section
- [ ] Create modal showing practice room gallery + booking form
- [ ] Booking form fields:
  - [ ] Membership tier selection (Option 1/2/3 or Non-member)
  - [ ] Preferred date and time
  - [ ] Duration (1-2 hours)
  - [ ] Name, email, phone
  - [ ] Additional notes
- [ ] Display pricing based on membership tier selection
- [ ] Show payment methods (Zelle, Venmo, Cash)
- [ ] Send confirmation email with booking details

### Admin Dashboard & Authentication
- [ ] Create admin login page
- [ ] Implement admin authentication (check user role = 'admin')
- [ ] Create /admin/dashboard route with admin-only access control
- [ ] Admin dashboard features:
  - [ ] View all practice room bookings
  - [ ] View all lesson bookings
  - [ ] View all musician hire inquiries
  - [ ] Cancel/reschedule bookings
  - [ ] Manage room availability
- [ ] Add logout functionality
- [ ] Redirect non-admin users to home page


## Latest Sprint - COMPLETED ✅ (March 31, 2026)

### Practice Room Booking Modal (Spaces Section)
- [x] Add "Book a Practice Room" button to Practice Rooms card in Spaces section
- [x] Create modal showing practice room gallery + booking form
- [x] Booking form with all required fields:
  - [x] Membership tier selection (Option 1/2/3 or Non-member)
  - [x] Preferred date and time
  - [x] Duration (1-2 hours)
  - [x] Name, email, phone
  - [x] Additional notes
- [x] Display pricing based on membership tier
- [x] Show payment methods (Zelle, Venmo, Cash)
- [x] Form validation and error handling

### Admin Dashboard & Authentication
- [x] Create admin login page (/admin/login)
- [x] Implement admin authentication (check user role = 'admin')
- [x] Create /admin/dashboard route with admin-only access control
- [x] Admin dashboard features:
  - [x] View all practice room bookings
  - [x] View all lesson bookings
  - [x] Display booking statistics (total, lesson, practice room counts)
  - [x] Tab-based navigation between booking types
  - [x] Booking details display (student name, email, duration, etc.)
  - [x] User profile display in header
- [x] Add logout functionality with LogOut icon
- [x] Redirect non-admin users to home page
- [x] Backend procedures for admin access:
  - [x] getAllLessonBookings (admin only)
  - [x] getAllPracticeRoomBookings (admin only)
- [x] All 23 tests passing


## New Sprint - Admin Booking Management (In Progress)

### Cancel/Reschedule Bookings
- [ ] Add cancel button to each booking in admin dashboard
- [ ] Add reschedule button to each booking in admin dashboard
- [ ] Create cancel confirmation modal
- [ ] Create reschedule modal with date/time picker
- [ ] Update booking status in database (cancelled, rescheduled)
- [ ] Send notification emails to students when booking is cancelled/rescheduled
- [ ] Backend procedures:
  - [ ] cancelBooking (admin only)
  - [ ] rescheduleBooking (admin only)

### Block Time Slots
- [ ] Create "Block Time Slots" interface in admin dashboard
- [ ] Add modal to block specific date/time ranges
- [ ] Create blockedTimeSlots database table
- [ ] Backend procedures:
  - [ ] blockTimeSlot (admin only)
  - [ ] unblockTimeSlot (admin only)
  - [ ] getBlockedTimeSlots
- [ ] Prevent new bookings during blocked times
- [ ] Display blocked times in calendar view

## Admin Booking Management Features ✅ COMPLETED

### Cancel/Reschedule Bookings ✅
- [x] Add cancel button to each booking in admin dashboard
- [x] Add reschedule button to each booking in admin dashboard
- [x] Update booking status in database (cancelled, rescheduled)
- [x] Backend procedures:
  - [x] cancelLessonBooking (admin only)
  - [x] cancelPracticeRoomBooking (admin only)
  - [x] rescheduleLessonBooking (admin only)
  - [x] reschedulePracticeRoomBooking (admin only)

### Block Time Slots ✅
- [x] Create "Block Time Slots" interface in admin dashboard
- [x] Add modal to block specific date/time ranges
- [x] Create blockedTimeSlots database table
- [x] Backend procedures:
  - [x] blockTimeSlot (admin only)
  - [x] unblockTimeSlot (admin only)
  - [x] getBlockedTimeSlots
- [x] Display blocked times in admin dashboard
- [x] Admin can view, create, and delete blocked time slots


## Current Sprint - Admin Features & Form Unification (In Progress)

### Admin Features Enhancement
- [ ] Send cancellation notification emails to students
  - [ ] Add email template for cancellations
  - [ ] Integrate email sending in cancelLessonBooking/cancelPracticeRoomBooking procedures
- [ ] Implement reschedule modal with date/time picker
  - [ ] Create reschedule modal component
  - [ ] Add date/time selection UI
  - [ ] Integrate with rescheduleLessonBooking/reschedulePracticeRoomBooking procedures
- [ ] Add booking filters to admin dashboard
  - [ ] Filter by date range (from/to dates)
  - [ ] Filter by status (pending, confirmed, cancelled)
  - [ ] Filter by teacher/room type
  - [ ] Apply multiple filters simultaneously

### Practice Room Booking Form Unification
- [ ] Extract PracticeRoomBookingModal into reusable component
- [ ] Add "Book Practice Room" button to header/navigation
- [ ] Add "Book Practice Room" button to footer section
- [ ] Ensure all instances use same form structure with membership tiers
- [ ] Test form functionality across all locations


## Admin Features & Form Unification ✅ COMPLETED

### Email Notifications ✅
- [x] Added sendCancellationEmail function
- [x] Integrated email sending in cancelLessonBooking procedure
- [x] Integrated email sending in cancelPracticeRoomBooking procedure
- [x] Email templates with professional styling

### Reschedule Modal ✅
- [x] Created reschedule modal component with date/time picker
- [x] Added to admin dashboard with form validation
- [x] Integrated with reschedule button handlers

### Booking Filters ✅
- [x] Added filter state (status, dateFrom, dateTo)
- [x] Implemented filter logic for lesson bookings
- [x] Implemented filter logic for practice room bookings
- [x] Added filter UI with dropdown and date inputs
- [x] Filters applied in real-time

### Practice Room Form Unification ✅
- [x] Extracted PracticeRoomBookingModal into reusable component
- [x] Added to header navigation (Book Practice Room button)
- [x] Added to Spaces section (Practice Rooms card)
- [x] Unified form with membership tier selection
- [x] Form includes all fields: date, time, duration, contact info, notes
- [x] Displays pricing tiers (Option 1/2/3, Non-Member)
- [x] Image gallery of practice rooms
- [x] Form validation and error handling


## Current Sprint - Home Page Consolidation

### Integration Tasks
- [ ] Add Membership Plans section to Home page (from MembershipPricing.tsx)
- [ ] Add Membership Login button to Home page header
- [ ] Add Admin Login button to Home page header
- [ ] Integrate full practice room booking form into Home page (from PracticeRoomBooking.tsx)
- [ ] Create role-based secondary forms:
  - [ ] Member dashboard after login
  - [ ] Admin dashboard (already exists, link from Home)
- [ ] Add user profile/account section for logged-in members
- [ ] Test all login flows and role-based access


## Current Sprint - Admin Email/Password Login ✅ COMPLETED

### Admin Authentication System ✅
- [x] Create admin authentication backend procedures (adminLogin in systemRouter)
- [x] Add admin users to database with hashed passwords (3 accounts)
  - [x] appassionatava@gmail.com / 12345678
  - [x] admin@amusicva.com / 12345678
  - [x] Norman@amusicva.com / 12345678
- [x] Modify AdminLogin page UI (remove Manus OAuth, add email/password form)
- [x] Implement login validation and session management
- [x] Test admin login with all three accounts
- [x] All 23 tests passing


## Current Sprint - Bug Fixes ✅ COMPLETED

### Lessons Section Fix ✅
- [x] Remove Member Login redirect from Piano instrument card
- [x] Restore "Book a Lesson" form when clicking Piano
- [x] Verify form displays correctly with all fields
- [x] Changed text to "Click to book a lesson"

### Contact Section Fix ✅
- [x] Remove "Book and Lesson Online" button from Contact section
- [x] Clean up Contact section layout
- [x] All 23 tests passing


## Current Sprint - UI Fixes (In Progress)

### Lessons Booking Form
- [ ] Restore original "Book a Lesson" form for Lessons section
- [ ] Form should display: teacher name, duration, student email
- [ ] Remove Mango login redirect

### Member Login Simplification
- [ ] Simplify Member Login modal to show only two fields
- [ ] Field 1: Member Email
- [ ] Field 2: Password
- [ ] Remove other options/content

### Welcome Screen Back Button
- [ ] Add back arrow button to top-left corner of Welcome/Login screen
- [ ] Button should navigate back to home page
