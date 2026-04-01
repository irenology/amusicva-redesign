import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { lessonBookings, practiceRoomBookings, blockedTimeSlots } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";
import { invokeLLM } from "../_core/llm";
import nodemailer from "nodemailer";

// Email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

async function sendCancellationEmail(
  studentEmail: string,
  studentName: string,
  bookingType: "lesson" | "practice",
  details: Record<string, string>
) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[Email] SMTP configuration incomplete, skipping email send");
    return;
  }

  const subject =
    bookingType === "lesson"
      ? "Lesson Booking Cancelled - Appassionata Music School"
      : "Practice Room Booking Cancelled - Appassionata Music School";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #c33; color: white; padding: 20px; text-align: center; border-radius: 5px; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: white; padding: 15px; border-left: 4px solid #c33; margin: 15px 0; }
        .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${bookingType === "lesson" ? "Lesson Booking" : "Practice Room Booking"} Cancelled</h1>
        </div>
        <div class="content">
          <p>Dear ${studentName},</p>
          <p>We regret to inform you that your ${bookingType === "lesson" ? "lesson" : "practice room"} booking has been cancelled by our administration team.</p>
          
          <div class="details">
            <h3>Cancellation Details</h3>
            <p><strong>Booking Type:</strong> ${bookingType === "lesson" ? "Lesson" : "Practice Room"}</p>
            ${details.reason ? `<p><strong>Reason:</strong> ${details.reason}</p>` : ""}
            <p><strong>Cancellation Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>If you have any questions about this cancellation or would like to reschedule, please contact us at your earliest convenience.</p>
          
          <p><strong>Contact Information:</strong><br>
          Email: <a href="mailto:appassionatava@gmail.com">appassionatava@gmail.com</a></p>
          
          <p>Best regards,<br>
          <strong>Appassionata Music School of Virginia</strong><br>
          Fairfax, Virginia</p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: studentEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[Email] Cancellation email sent to ${studentEmail}`);
  } catch (error) {
    console.error(`[Email] Failed to send cancellation email: ${error}`);
  }
}

async function sendConfirmationEmail(
  studentEmail: string,
  studentName: string,
  bookingType: "lesson" | "practice",
  details: Record<string, string>
) {
  // Verify SMTP configuration
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[Email] SMTP configuration incomplete, skipping email send");
    return;
  }

  const subject =
    bookingType === "lesson"
      ? "Lesson Booking Confirmation - Appassionata Music School"
      : "Practice Room Booking Confirmation - Appassionata Music School";

  const htmlContent =
    bookingType === "lesson"
      ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #B8860B; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { background-color: white; padding: 15px; border-left: 4px solid #B8860B; margin: 15px 0; }
            .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Lesson Booking Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${studentName},</p>
              <p>Thank you for choosing Appassionata Music School! We are delighted to confirm that we have received your lesson booking request.</p>
              
              <div class="details">
                <h3>Booking Details</h3>
                <p><strong>Teacher:</strong> ${details.teacher}</p>
                <p><strong>Duration:</strong> ${details.duration} minutes</p>
                <p><strong>Status:</strong> Pending Confirmation</p>
              </div>
              
              <p>Our team will contact you shortly to confirm your preferred lesson time and discuss pricing options. We look forward to helping you achieve your musical goals!</p>
              
              <p>If you have any questions or need to reschedule, please don't hesitate to reach out to us.</p>
              
              <p><strong>Contact Information:</strong><br>
              Email: <a href="mailto:appassionatava@gmail.com">appassionatava@gmail.com</a></p>
              
              <p>Best regards,<br>
              <strong>Appassionata Music School of Virginia</strong><br>
              Fairfax, Virginia</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #B8860B; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .details { background-color: white; padding: 15px; border-left: 4px solid #B8860B; margin: 15px 0; }
            .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Practice Room Booking Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${studentName},</p>
              <p>Thank you for choosing Appassionata Music School! We are pleased to confirm that we have received your practice room booking request.</p>
              
              <div class="details">
                <h3>Booking Details</h3>
                <p><strong>Room Type:</strong> ${details.roomType === 'premium' ? 'Premium Practice Room' : 'Standard Practice Room'}</p>
                <p><strong>Duration:</strong> ${details.hours} hour(s)</p>
                <p><strong>Status:</strong> Pending Confirmation</p>
              </div>
              
              <p>Our team will contact you shortly to confirm your preferred time slot and discuss pricing. We maintain state-of-the-art practice facilities to support your musical development.</p>
              
              <p>If you have any questions or need to reschedule, please don't hesitate to reach out to us.</p>
              
              <p><strong>Contact Information:</strong><br>
              Email: <a href="mailto:appassionatava@gmail.com">appassionatava@gmail.com</a></p>
              
              <p>Best regards,<br>
              <strong>Appassionata Music School of Virginia</strong><br>
              Fairfax, Virginia</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Appassionata Music School'}" <${process.env.SMTP_FROM_EMAIL || 'appassionatava@gmail.com'}>`,
      to: studentEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[Email] Confirmation email sent to ${studentEmail}`);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    // Don't throw - booking should still succeed even if email fails
  }
}

export const bookingsRouter = router({
  // Submit a lesson booking
  submitLessonBooking: publicProcedure
    .input(
      z.object({
        studentName: z.string().min(1, "Name required"),
        studentEmail: z.string().email("Valid email required"),
        teacherName: z.string().min(1, "Teacher required"),
        duration: z.enum(["30", "45", "60"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const booking = await db.insert(lessonBookings).values({
        studentName: input.studentName,
        studentEmail: input.studentEmail,
        teacherName: input.teacherName,
        duration: parseInt(input.duration),
      });

      // Send confirmation email to student
      await sendConfirmationEmail(
        input.studentEmail,
        input.studentName,
        "lesson",
        {
          teacher: input.teacherName,
          duration: input.duration,
        }
      );

      // Notify owner
      await notifyOwner({
        title: "New Lesson Booking Request",
        content: `${input.studentName} (${input.studentEmail}) requested a ${input.duration}-minute lesson with ${input.teacherName}. Contact them to confirm details and pricing.`,
      });

      return { success: true, bookingId: booking[0] };
    }),

  // Submit a practice room booking
  submitPracticeRoomBooking: publicProcedure
    .input(
      z.object({
        studentName: z.string().min(1, "Name required"),
        studentEmail: z.string().email("Valid email required"),
        roomType: z.enum(["standard", "premium"]),
        hours: z.number().min(1).max(8),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const booking = await db.insert(practiceRoomBookings).values({
        studentName: input.studentName,
        studentEmail: input.studentEmail,
        roomType: input.roomType,
        hours: input.hours,
      });

      // Send confirmation email to student
      await sendConfirmationEmail(
        input.studentEmail,
        input.studentName,
        "practice",
        {
          roomType: input.roomType,
          hours: input.hours.toString(),
        }
      );

      // Notify owner
      await notifyOwner({
        title: "New Practice Room Booking Request",
        content: `${input.studentName} (${input.studentEmail}) requested ${input.hours} hours in a ${input.roomType} practice room. Contact them to confirm availability and pricing.`,
      });

      return { success: true, bookingId: booking[0] };
    }),

  // Admin: Get all lesson bookings
  getAllLessonBookings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const bookings = await db.select().from(lessonBookings);
    return bookings;
  }),

  // Admin: Get all practice room bookings
  getAllPracticeRoomBookings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const bookings = await db.select().from(practiceRoomBookings);
    return bookings;
  }),

  // Admin: Cancel lesson booking
  cancelLessonBooking: protectedProcedure
    .input(z.object({ bookingId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const bookings = await db.select().from(lessonBookings).where(eq(lessonBookings.id, input.bookingId));
      const booking = bookings[0];

      await db
        .update(lessonBookings)
        .set({ status: "cancelled" })
        .where(eq(lessonBookings.id, input.bookingId));

      if (booking) {
        await sendCancellationEmail(booking.studentEmail, booking.studentName, "lesson", {
          teacher: booking.teacherName,
          duration: booking.duration.toString(),
        });
      }

      return { success: true, message: "Lesson booking cancelled and student notified" };
    }),

  // Admin: Cancel practice room booking
  cancelPracticeRoomBooking: protectedProcedure
    .input(z.object({ bookingId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const bookings = await db.select().from(practiceRoomBookings).where(eq(practiceRoomBookings.id, input.bookingId));
      const booking = bookings[0];

      await db
        .update(practiceRoomBookings)
        .set({ status: "cancelled" })
        .where(eq(practiceRoomBookings.id, input.bookingId));

      if (booking) {
        await sendCancellationEmail(booking.studentEmail, booking.studentName, "practice", {
          roomType: booking.roomType,
          hours: booking.hours.toString(),
        });
      }

      return { success: true, message: "Practice room booking cancelled and student notified" };
    }),

  // Admin: Reschedule lesson booking
  rescheduleLessonBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(lessonBookings)
        .set({ status: "confirmed", notes: input.notes })
        .where(eq(lessonBookings.id, input.bookingId));

      return { success: true, message: "Lesson booking rescheduled" };
    }),

  // Admin: Reschedule practice room booking
  reschedulePracticeRoomBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(practiceRoomBookings)
        .set({ status: "confirmed", notes: input.notes })
        .where(eq(practiceRoomBookings.id, input.bookingId));

      return { success: true, message: "Practice room booking rescheduled" };
    }),

  // Admin: Block time slot
  blockTimeSlot: protectedProcedure
    .input(
      z.object({
        blockDate: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        reason: z.string().optional(),
        roomType: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(blockedTimeSlots).values({
        blockDate: input.blockDate,
        startTime: input.startTime,
        endTime: input.endTime,
        reason: input.reason,
        roomType: input.roomType,
        createdBy: ctx.user.id,
      });

      return { success: true, message: "Time slot blocked" };
    }),

  // Admin: Get all blocked time slots
  getBlockedTimeSlots: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const slots = await db.select().from(blockedTimeSlots);
    return slots;
  }),

  // Admin: Unblock time slot
  unblockTimeSlot: protectedProcedure
    .input(z.object({ slotId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.delete(blockedTimeSlots).where(eq(blockedTimeSlots.id, input.slotId));

      return { success: true, message: "Time slot unblocked" };
    }),
});
