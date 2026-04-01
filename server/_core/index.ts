import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { adminLoginRoute } from "../admin-login-route";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
// Admin accounts that must always exist
const REQUIRED_ADMINS = [
  { email: "admin@amusicva.com", password: "12345678", name: "Admin" },
  { email: "appassionatava@gmail.com", password: "12345678", name: "Appassionata Admin" },
  { email: "Norman.Charette@gmail.com", password: "12345678", name: "Norman Charette" },
  { email: "Norman@amusicva.com", password: "12345678", name: "Norman" },
];
async function ensureAdminAccounts() {
  const db = await getDb();
  if (!db) {
    console.warn("[Startup] DB not available, skipping admin account setup");
    return;
  }
  for (const admin of REQUIRED_ADMINS) {
    try {
      const existing = await db.select().from(users).where(eq(users.email, admin.email)).limit(1);
      const hashedPw = await hash(admin.password, 10);
      if (existing.length === 0) {
        await db.insert(users).values({
          email: admin.email,
          password: hashedPw,
          role: "admin",
          name: admin.name,
          loginMethod: "email",
          lastSignedIn: new Date(),
        });
        console.log(`[Startup] Created admin: ${admin.email}`);
      } else if (existing[0].role !== "admin" || !existing[0].password) {
        await db.update(users).set({ role: "admin", password: hashedPw }).where(eq(users.email, admin.email));
        console.log(`[Startup] Fixed admin: ${admin.email}`);
      }
    } catch (err) {
      console.error(`[Startup] Error setting up ${admin.email}:`, err);
    }
  }
}
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  // Ensure all admin accounts exist before serving requests
  await ensureAdminAccounts();
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use("/api/admin-login", adminLoginRoute);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/ - v2`);
  });
}
startServer().catch(console.error);
