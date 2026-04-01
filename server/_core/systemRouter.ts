import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { compare } from "bcryptjs";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const systemRouter = router({
  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  adminLogin: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(1, "Password is required"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Find user by email
        const db = await getDb();
        if (!db) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Database connection failed",
          });
        }

        const user = await db.select().from(users).where(eq(users.email, input.email)).limit(1);
        const foundUser = user.length > 0 ? user[0] : null;

        if (!foundUser || !foundUser.password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Check if user is admin
        if (foundUser.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have admin privileges",
          });
        }

        // Verify password
        const isPasswordValid = await compare(input.password, foundUser.password);
        if (!isPasswordValid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Return success - session will be managed by cookies
        return {
          success: true,
          user: {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Login failed",
        });
      }
    }),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),
});
