export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

import { createAccessToken, verifyPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError } from '@/lib/serializers'

export async function POST(request: NextRequest) {
  await ensureSeeded()
  const body = (await request.json()) as { username?: string; password?: string }
  if (!body.username || !body.password) {
    return jsonError('Invalid credentials', 401)
  }

  const admin = await prisma.adminUser.findUnique({ where: { username: body.username } })
  if (!admin || !(await verifyPassword(body.password, admin.passwordHash))) {
    return jsonError('Invalid credentials', 401)
  }

  const access_token = await createAccessToken(admin.username)
  return Response.json({ access_token, token_type: 'bearer' })
}
