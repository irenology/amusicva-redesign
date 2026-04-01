import express, { Request, Response } from "express";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { sdk } from "./_core/sdk";
import { getSessionCookieOptions } from "./_core/cookies";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const adminLoginRoute = express.Router();

adminLoginRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ success: false, message: "Database unavailable" });
    }

    const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = rows[0];

    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Store email as the session openId.
    // sdk.ts authenticateRequest handles email-based sessions via getUserByEmail fallback.
    const token = await sdk.createSessionToken(user.email as string, {
      name: (user.name || user.email) as string,
    });

    res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(req), maxAge: ONE_YEAR_MS });

    return res.json({ success: true, message: "Login successful", user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[AdminLogin]", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});
