/**
 * CMS Database Client — Prisma singleton (server-side only)
 *
 * This module MUST never be imported from client components.
 * It reads DATABASE_URL from environment and maintains a single
 * PrismaClient instance per process.
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
