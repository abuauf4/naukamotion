/**
 * Bootstrap Admin — Create initial admin user in Neon
 *
 * Usage: bun run scripts/bootstrap-admin.ts
 *
 * Reads ADMIN_USERNAME and ADMIN_PASSWORD from env.
 * If admin already exists, updates password hash.
 * Password is hashed with bcrypt — never stored as plaintext.
 */

import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/cms/db';

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const name = 'Abu Aufa';
  const email = 'mochamadbagussuhada@gmail.com';

  if (!username || !password) {
    console.error('❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in env');
    process.exit(1);
  }

  if (password.length < 6) {
    console.error('❌ ADMIN_PASSWORD must be at least 6 characters');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.admin.findUnique({ where: { username } });

  if (existing) {
    await prisma.admin.update({
      where: { username },
      data: { password: hashedPassword, name, email },
    });
    console.log(`✅ Admin "${username}" password updated`);
  } else {
    await prisma.admin.create({
      data: { username, password: hashedPassword, name, email },
    });
    console.log(`✅ Admin "${username}" created`);
  }

  // Verify
  const verify = await prisma.admin.findUnique({ where: { username } });
  if (verify) {
    const match = await bcrypt.compare(password, verify.password);
    console.log(`   Password verification: ${match ? '✅ OK' : '❌ FAILED'}`);
  }
}

main()
  .catch((e) => { console.error('❌ Bootstrap failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
