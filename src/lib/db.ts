import { copyFileSync, existsSync } from 'fs'
import path from 'path'

import { PrismaClient } from '@prisma/client'

/**
 * Vercel’s FS is read-only except /tmp. Bundle a schema-ready sqlite at build
 * (prisma/deploy.db), then copy it to /tmp on cold start.
 */
function resolveDatabaseUrl(): string | undefined {
  if (process.env.VERCEL) {
    const tmpDb = '/tmp/resume-app.db'
    const bundled = path.join(process.cwd(), 'prisma', 'deploy.db')
    try {
      if (!existsSync(tmpDb) && existsSync(bundled)) {
        copyFileSync(bundled, tmpDb)
      }
    } catch {
      // seed path will surface a clearer error if db is unusable
    }
    return `file:${tmpDb}`
  }
  return process.env.DATABASE_URL
}

const datasourceUrl = resolveDatabaseUrl()

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: datasourceUrl ? { db: { url: datasourceUrl } } : undefined,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
