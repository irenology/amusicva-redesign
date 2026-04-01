import express, { Request, Response } from "express";
import { compare } from "bcryptjs";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";

const COOKIE_NAME = "app_session_id";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

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

    const foundUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then((rows) => rows[0]);

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

    const passwordMatch = await compare(password, foundUser.password || "");
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Use a special "admin:email" prefix so the session resolver knows to look up by email
    const sessionIdentifier = `admin:${foundUser.email}`;
    const sessionToken = await sdk.createSessionToken(sessionIdentifier, {
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
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
