export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError } from '@/lib/serializers'

export async function GET(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const [members, site] = await Promise.all([
    prisma.teamMember.findMany(),
    prisma.siteSettings.findFirst(),
  ])

  return Response.json({
    members_count: members.length,
    published_count: members.filter((m) => m.isPublished).length,
    brand_name: site?.brandName || 'Genesis',
  })
}
