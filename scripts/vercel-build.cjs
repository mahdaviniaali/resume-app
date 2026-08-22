/**
 * Ensures Prisma + sqlite are ready for Vercel builds (no project env required).
 * Creates prisma/deploy.db so serverless functions can copy it into /tmp.
 */
const { spawnSync } = require('child_process')
const path = require('path')

process.env.DATABASE_URL = 'file:./deploy.db'
process.env.SECRET_KEY = process.env.SECRET_KEY || 'vercel-build-placeholder'
process.env.ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
    cwd: path.join(__dirname, '..'),
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

run('npx', ['prisma', 'generate'])
run('npx', ['prisma', 'db', 'push', '--skip-generate', '--accept-data-loss'])
// Bake current profile JSON into deploy.db so first request isn't stale.
run('node', ['scripts/seed-profiles.cjs'])
run('npx', ['next', 'build'])
