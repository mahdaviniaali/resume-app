import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, memberToPublic } from '@/lib/serializers'

export async function PUT(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const body = (await request.json()) as {
    items?: { id: number; sort_order: number }[]
  }

  if (!Array.isArray(body.items)) {
    return jsonError('Invalid reorder payload', 400)
  }

  await prisma.$transaction(
    body.items.map((item) =>
      prisma.teamMember.update({
        where: { id: item.id },
        data: { sortOrder: item.sort_order },
      }),
    ),
  )

  const members = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  })
  return Response.json(members.map(memberToPublic))
}
