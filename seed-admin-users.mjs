import { hash } = from 'bcryptjs';
import { db } from './server/db.ts';
import { users } from './drizzle/schema.ts';

const adminUsers = [
  { email: 'appassionatava@gmail.com', password: '12345678', name: 'Appassionata Admin' },
  { email: 'admin@amusicva.com', password: '12345678', name: 'Admin' },
  { email: 'Norman@amusicva.com', password: '12345678', name: 'Norman' },
];

async function seedAdmins() {
  try {
    for (const admin of adminUsers) {
      const hashedPassword = await hash(admin.password, 10);
      await db.insert(users).values({
        email: admin.email,
        password: hashedPassword,
        name: admin.name,
        role: 'admin',
      });
      console.log(`✓ Created admin: ${admin.email}`);
    }
    console.log('✓ All admin users created successfully');
  } catch (error) {
    console.error('Error seeding admins:', error);
  }
}

seedAdmins();
