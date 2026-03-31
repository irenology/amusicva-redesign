import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Lesson Bookings Table
export const lessonBookings = mysqlTable("lesson_bookings", {
  id: int("id").autoincrement().primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 320 }).notNull(),
  teacherName: varchar("teacher_name", { length: 255 }).notNull(),
  duration: int("duration").notNull(), // in minutes: 30, 45, 60
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LessonBooking = typeof lessonBookings.$inferSelect;
export type InsertLessonBooking = typeof lessonBookings.$inferInsert;

// Practice Room Bookings Table
export const practiceRoomBookings = mysqlTable("practice_room_bookings", {
  id: int("id").autoincrement().primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 320 }).notNull(),
  roomType: varchar("room_type", { length: 100 }).notNull(), // standard or premium
  hours: int("hours").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PracticeRoomBooking = typeof practiceRoomBookings.$inferSelect;
export type InsertPracticeRoomBooking = typeof practiceRoomBookings.$inferInsert;
// Practice Room Calendar Bookings (for self-service booking system)
export const practiceRoomCalendarBookings = mysqlTable("practice_room_calendar_bookings", {
  id: int("id").autoincrement().primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 320 }).notNull(),
  studentPhone: varchar("student_phone", { length: 20 }),
  bookingDate: varchar("booking_date", { length: 10 }).notNull(), // YYYY-MM-DD format
  startTime: varchar("start_time", { length: 5 }).notNull(), // HH:MM format
  endTime: varchar("end_time", { length: 5 }).notNull(), // HH:MM format
  durationHours: int("duration_hours").notNull(),
  roomType: varchar("room_type", { length: 100 }).notNull(), // standard or premium
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending").notNull(),
  accessToken: varchar("access_token", { length: 64 }).notNull().unique(), // Private URL token
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PracticeRoomCalendarBooking = typeof practiceRoomCalendarBookings.$inferSelect;
export type InsertPracticeRoomCalendarBooking = typeof practiceRoomCalendarBookings.$inferInsert;

// Events Table
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: varchar("event_date", { length: 10 }).notNull(), // YYYY-MM-DD format
  eventTime: varchar("event_time", { length: 5 }), // HH:MM format
  venue: varchar("venue", { length: 255 }),
  eventType: mysqlEnum("event_type", ["upcoming", "past"]).notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
