/**
 * CMS Database Client — Prisma singleton (server-side only)
 *
 * Reads DATABASE_URL from process.env (works on Vercel without .env file).
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const datasourceUrl = process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['warn', 'error'],
    datasourceUrl,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
