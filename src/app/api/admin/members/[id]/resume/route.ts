import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, memberToDetail } from '@/lib/serializers'

type Params = { params: { id: string } }

export async function PUT(request: NextRequest, { params }: Params) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const memberId = Number(params.id)
  if (!Number.isInteger(memberId) || memberId <= 0) {
    return jsonError('Member not found', 404)
  }

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
    include: { resume: true },
  })
  if (!member) return jsonError('Member not found', 404)

  const body = (await request.json()) as { data?: Record<string, unknown> }
  if (!body.data || typeof body.data !== 'object') {
    return jsonError('Invalid resume payload', 400)
  }

  const dataJson = JSON.stringify(body.data)

  if (member.resume) {
    await prisma.resume.update({
      where: { memberId },
      data: { dataJson },
    })
  } else {
    await prisma.resume.create({
      data: { memberId, dataJson },
    })
  }

  const updated = await prisma.teamMember.findUnique({
    where: { id: memberId },
    include: { resume: true },
  })
  return Response.json(memberToDetail(updated!))
}
