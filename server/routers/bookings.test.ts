import { describe, it, expect, beforeEach, vi } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Suppress console output during tests
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

beforeEach(() => {
  console.log = vi.fn();
  console.warn = vi.fn();
  console.error = vi.fn();
});



// Mock database and notification
vi.mock("../db", () => ({
  getDb: vi.fn(() => Promise.resolve({
    insert: vi.fn(() => ({
      values: vi.fn(() => [1]),
    })),
  })),
}));

vi.mock("../_core/notification", () => ({
  notifyOwner: vi.fn(() => Promise.resolve(true)),
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn(() => Promise.resolve({ messageId: "test-123" })),
    })),
  },
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("bookings router", () => {
  describe("submitLessonBooking", () => {
    it("should accept valid lesson booking data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bookings.submitLessonBooking({
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        teacherName: "Norman Charette",
        duration: "60",
      });

      expect(result.success).toBe(true);
      expect(result.bookingId).toBeDefined();
    });

    it("should reject invalid email", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.bookings.submitLessonBooking({
          studentName: "Jane Smith",
          studentEmail: "invalid-email",
          teacherName: "Norman Charette",
          duration: "60",
        })
      ).rejects.toThrow();
    });

    it("should reject empty student name", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.bookings.submitLessonBooking({
          studentName: "",
          studentEmail: "jane@example.com",
          teacherName: "Norman Charette",
          duration: "60",
        })
      ).rejects.toThrow();
    });

    it("should accept valid durations", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      for (const duration of ["30", "45", "60"]) {
        const result = await caller.bookings.submitLessonBooking({
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          teacherName: "Norman Charette",
          duration: duration as "30" | "45" | "60",
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("submitPracticeRoomBooking", () => {
    it("should accept valid practice room booking data", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bookings.submitPracticeRoomBooking({
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        roomType: "standard",
        hours: 2,
      });

      expect(result.success).toBe(true);
      expect(result.bookingId).toBeDefined();
    });

    it("should reject invalid room type", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.bookings.submitPracticeRoomBooking({
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          roomType: "invalid" as any,
          hours: 2,
        })
      ).rejects.toThrow();
    });

    it("should reject invalid hours (too many)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.bookings.submitPracticeRoomBooking({
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          roomType: "standard",
          hours: 10,
        })
      ).rejects.toThrow();
    });

    it("should accept valid room types", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      for (const roomType of ["standard", "premium"]) {
        const result = await caller.bookings.submitPracticeRoomBooking({
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          roomType: roomType as "standard" | "premium",
          hours: 2,
        });
        expect(result.success).toBe(true);
      }
    });
  });
});
