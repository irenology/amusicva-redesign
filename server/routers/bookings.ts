import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { lessonBookings, practiceRoomBookings } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import { invokeLLM } from "../_core/llm";
import nodemailer from "nodemailer";

// Email transporter using Manus built-in email service
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.manus.im",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "noreply@manus.im",
    pass: process.env.SMTP_PASS || "",
  },
});

async function sendConfirmationEmail(
  studentEmail: string,
  studentName: string,
  bookingType: "lesson" | "practice",
  details: Record<string, string>
) {
  const subject =
    bookingType === "lesson"
      ? "Your Lesson Booking Request - Appassionata Music School"
      : "Your Practice Room Booking Request - Appassionata Music School";

  const htmlContent =
    bookingType === "lesson"
      ? `
        <h2>Thank you for booking a lesson!</h2>
        <p>Hi ${studentName},</p>
        <p>We've received your booking request for a ${details.duration}-minute lesson with ${details.teacher}.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Teacher: ${details.teacher}</li>
          <li>Duration: ${details.duration} minutes</li>
          <li>Pricing: Please contact us for details</li>
        </ul>
        <p>We'll be in touch shortly to confirm your lesson time and discuss pricing.</p>
        <p>Contact us: <a href="mailto:appassionatava@gmail.com">appassionatava@gmail.com</a></p>
        <p>Best regards,<br/>Appassionata Music School of Virginia</p>
      `
      : `
        <h2>Thank you for booking a practice room!</h2>
        <p>Hi ${studentName},</p>
        <p>We've received your booking request for ${details.hours} hours in our ${details.roomType} practice room.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Room Type: ${details.roomType}</li>
          <li>Hours: ${details.hours}</li>
          <li>Pricing: Please contact us for details</li>
        </ul>
        <p>We'll be in touch shortly to confirm your room availability and discuss pricing.</p>
        <p>Contact us: <a href="mailto:appassionatava@gmail.com">appassionatava@gmail.com</a></p>
        <p>Best regards,<br/>Appassionata Music School of Virginia</p>
      `;

  try {
    await transporter.sendMail({
      from: '"Appassionata Music School" <appassionatava@gmail.com>',
      to: studentEmail,
      subject,
      html: htmlContent,
    });
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
});
