import express, { Request, Response } from "express";
import { hash } from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const seedAdminsRoute = express.Router();

const ADMIN_ACCOUNTS = [
  { email: "admin@amusicva.com", password: "12345678", name: "Admin" },
  { email: "appassionatava@gmail.com", password: "12345678", name: "Appassionata Admin" },
  { email: "Norman.Charette@gmail.com", password: "12345678", name: "Norman Charette" },
  { email: "Norman@amusicva.com", password: "12345678", name: "Norman" },
];

// One-time seed endpoint - creates/updates all admin accounts
seedAdminsRoute.post("/", async (req: Request, res: Response) => {
  // Simple secret check to prevent unauthorized use
  const { secret } = req.body;
  if (secret !== "seed-amusicva-admins-2024") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  const db = await getDb();
  if (!db) {
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }

  const results: { email: string; status: string }[] = [];

  for (const admin of ADMIN_ACCOUNTS) {
    try {
      const hashedPassword = await hash(admin.password, 10);

      // Check if user exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, admin.email))
        .limit(1);

      if (existing.length > 0) {
        // Update existing user - set role to admin and update password
        await db
          .update(users)
          .set({
            password: hashedPassword,
            role: "admin",
            name: admin.name,
          })
          .where(eq(users.email, admin.email));
        results.push({ email: admin.email, status: "updated" });
      } else {
        // Insert new admin user
        await db.insert(users).values({
          email: admin.email,
          password: hashedPassword,
          role: "admin",
          name: admin.name,
          loginMethod: "email",
          lastSignedIn: new Date(),
        });
        results.push({ email: admin.email, status: "created" });
      }
    } catch (error) {
      results.push({ email: admin.email, status: `error: ${String(error)}` });
    }
  }

  return res.json({ success: true, results });
});
