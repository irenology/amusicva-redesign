import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { practiceRoomCalendarBookings } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

function generateAccessToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export const practiceRoomCalendarRouter = router({
  // Get available time slots for a specific date
  getAvailableSlots: publicProcedure
    .input(
      z.object({
        bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        roomType: z.enum(["standard", "premium"]),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get all bookings for this date and room type
      const bookings = await db
        .select()
        .from(practiceRoomCalendarBookings)
        .where(
          and(
            eq(practiceRoomCalendarBookings.bookingDate, input.bookingDate),
            eq(practiceRoomCalendarBookings.roomType, input.roomType),
            eq(practiceRoomCalendarBookings.status, "confirmed")
          )
        );

      // Define business hours (9 AM to 9 PM)
      const hours = Array.from({ length: 12 }, (_, i) => {
        const hour = 9 + i;
        return `${String(hour).padStart(2, "0")}:00`;
      });

      // Mark booked slots
      const bookedSlots = new Set<string>();
      bookings.forEach((booking) => {
        const [startHour] = booking.startTime.split(":");
        const [endHour] = booking.endTime.split(":");
        const start = parseInt(startHour);
        const end = parseInt(endHour);
        for (let i = start; i < end; i++) {
          bookedSlots.add(`${String(i).padStart(2, "0")}:00`);
        }
      });

      const availableSlots = hours.filter((slot) => !bookedSlots.has(slot));

      return { availableSlots, bookedSlots: Array.from(bookedSlots) };
    }),

  // Submit a practice room calendar booking
  submitCalendarBooking: publicProcedure
    .input(
      z.object({
        studentName: z.string().min(1, "Name required"),
        studentEmail: z.string().email("Valid email required"),
        studentPhone: z.string().optional(),
        bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        startTime: z.string().regex(/^\d{2}:\d{2}$/),
        endTime: z.string().regex(/^\d{2}:\d{2}$/),
        durationHours: z.number().min(0.5).max(2),
        roomType: z.enum(["standard", "premium"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Validate date is within 3-day advance booking window
      const bookingDate = new Date(input.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minDate = new Date(today);
      minDate.setDate(minDate.getDate() + 1);
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 3);

      if (bookingDate < minDate || bookingDate > maxDate) {
        throw new Error("Booking must be within 3-day advance window");
      }

      // Check for conflicts
      const conflicts = await db
        .select()
        .from(practiceRoomCalendarBookings)
        .where(
          and(
            eq(practiceRoomCalendarBookings.bookingDate, input.bookingDate),
            eq(practiceRoomCalendarBookings.roomType, input.roomType),
            eq(practiceRoomCalendarBookings.status, "confirmed")
          )
        );

      const [startHour] = input.startTime.split(":");
      const [endHour] = input.endTime.split(":");
      const start = parseInt(startHour);
      const end = parseInt(endHour);

      for (const conflict of conflicts) {
        const [conflictStart] = conflict.startTime.split(":");
        const [conflictEnd] = conflict.endTime.split(":");
        const cStart = parseInt(conflictStart);
        const cEnd = parseInt(conflictEnd);

        if (!(end <= cStart || start >= cEnd)) {
          throw new Error("Time slot already booked");
        }
      }

      // Generate access token for private link
      const accessToken = generateAccessToken();

      // Create booking
      const booking = await db
        .insert(practiceRoomCalendarBookings)
        .values({
          studentName: input.studentName,
          studentEmail: input.studentEmail,
          studentPhone: input.studentPhone,
          bookingDate: input.bookingDate,
          startTime: input.startTime,
          endTime: input.endTime,
          durationHours: input.durationHours,
          roomType: input.roomType,
          status: "confirmed",
          accessToken,
        });

      // Notify owner
      await notifyOwner({
        title: "New Practice Room Calendar Booking",
        content: `${input.studentName} (${input.studentEmail}) booked a ${input.roomType} practice room on ${input.bookingDate} from ${input.startTime} to ${input.endTime}. Contact them at ${input.studentPhone || "no phone provided"} to confirm.`,
      });

      return {
        success: true,
        bookingId: booking[0],
        accessToken,
        bookingLink: `/practice-room-booking/${accessToken}`,
      };
    }),

  // Get booking details by access token
  getBookingByToken: publicProcedure
    .input(z.object({ accessToken: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const booking = await db
        .select()
        .from(practiceRoomCalendarBookings)
        .where(eq(practiceRoomCalendarBookings.accessToken, input.accessToken));

      if (booking.length === 0) {
        throw new Error("Booking not found");
      }

      return booking[0];
    }),

  // Cancel booking by access token
  cancelBooking: publicProcedure
    .input(z.object({ accessToken: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(practiceRoomCalendarBookings)
        .set({ status: "cancelled" })
        .where(eq(practiceRoomCalendarBookings.accessToken, input.accessToken));

      return { success: true };
    }),
});
