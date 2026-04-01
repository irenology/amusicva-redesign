/**
 * Startup migration: ensures all required admin accounts exist in the database
 * with correct passwords and role=admin. Runs automatically when the server starts.
 */
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema";
import { getDb } from "./db";

const ADMIN_ACCOUNTS = [
  { email: "admin@amusicva.com", password: "12345678", name: "Admin" },
  { email: "appassionatava@gmail.com", password: "12345678", name: "Appassionata Admin" },
  { email: "Norman.Charette@gmail.com", password: "12345678", name: "Norman Charette" },
  { email: "Norman@amusicva.com", password: "12345678", name: "Norman" },
];

export async function runStartupMigration(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Startup] Database not available, skipping admin account migration");
    return;
  }

  console.log("[Startup] Running admin account migration...");

  for (const account of ADMIN_ACCOUNTS) {
    try {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, account.email))
        .limit(1);

      const hashedPassword = await hash(account.password, 10);

      if (existing.length > 0) {
        const user = existing[0];
        // Update role to admin and set password if missing or role is wrong
        if (user.role !== "admin" || !user.password) {
          await db
            .update(users)
            .set({
              role: "admin",
              password: hashedPassword,
              name: user.name || account.name,
            })
            .where(eq(users.email, account.email));
          console.log(`[Startup] Updated admin account: ${account.email}`);
        } else {
          console.log(`[Startup] Admin account OK: ${account.email}`);
        }
      } else {
        // Create the admin account
        await db.insert(users).values({
          email: account.email,
          password: hashedPassword,
          role: "admin",
          name: account.name,
          loginMethod: "email",
          lastSignedIn: new Date(),
        });
        console.log(`[Startup] Created admin account: ${account.email}`);
      }
    } catch (error) {
      console.error(`[Startup] Failed to process admin account ${account.email}:`, error);
    }
  }

  console.log("[Startup] Admin account migration complete.");
}
