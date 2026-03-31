import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { events } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const eventsRouter = router({
  // Get all upcoming events
  getUpcomingEvents: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const allEvents = await db
      .select()
      .from(events)
      .where(eq(events.eventType, "upcoming"));

    return allEvents.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      return dateA.getTime() - dateB.getTime();
    });
  }),

  // Get all past events
  getPastEvents: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const allEvents = await db
      .select()
      .from(events)
      .where(eq(events.eventType, "past"));

    return allEvents.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      return dateB.getTime() - dateA.getTime();
    });
  }),

  // Get event by ID
  getEventById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const event = await db
        .select()
        .from(events)
        .where(eq(events.id, input.id));

      if (event.length === 0) {
        throw new Error("Event not found");
      }

      return event[0];
    }),
});
