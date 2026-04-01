import express, { Request, Response } from "express";
import { compare } from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const adminLoginRoute = express.Router();

adminLoginRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const foundUser = rows[0];

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (foundUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You do not have admin access",
      });
    }

    if (!foundUser.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Use the user's email as the session openId.
    // The authenticateRequest in sdk.ts handles email-based sessions via getUserByEmail fallback.
    const sessionToken = await sdk.createSessionToken(foundUser.email as string, {
      name: (foundUser.name || foundUser.email) as string,
    });

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, sessionToken, {
      ...cookieOptions,
      maxAge: ONE_YEAR_MS,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      },
    });
  } catch (error) {
    console.error("[AdminLogin] Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
