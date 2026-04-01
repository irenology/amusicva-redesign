import { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const admins = [
  { email: "appassionatava@gmail.com", password: "12345678", name: "Admin 1" },
  { email: "admin@amusicva.com", password: "12345678", name: "Admin 2" },
  { email: "Norman@amusicva.com", password: "12345678", name: "Norman" },
];

async function seedAdmins() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    for (const admin of admins) {
      const hashedPassword = await hash(admin.password, 10);

      // Check if user exists
      const [existing] = await connection.execute(
        "SELECT id FROM users WHERE email = ?",
        [admin.email]
      );

      if (existing.length > 0) {
        // Update existing user
        await connection.execute(
          "UPDATE users SET password = ?, role = ?, name = ? WHERE email = ?",
          [hashedPassword, "admin", admin.name, admin.email]
        );
        console.log(`✓ Updated admin: ${admin.email}`);
      } else {
        // Insert new user
        await connection.execute(
          "INSERT INTO users (email, password, role, name, loginMethod) VALUES (?, ?, ?, ?, ?)",
          [admin.email, hashedPassword, "admin", admin.name, "email"]
        );
        console.log(`✓ Created admin: ${admin.email}`);
      }
    }

    console.log("\n✅ Admin users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding admins:", error);
  } finally {
    await connection.end();
  }
}

seedAdmins();
