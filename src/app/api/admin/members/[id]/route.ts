export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, memberToDetail } from '@/lib/serializers'

type Params = { params: { id: string } }

function parseId(id: string) {
  const n = Number(id)
  return Number.isInteger(n) && n > 0 ? n : null
}

export async function GET(request: NextRequest, { params }: Params) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const memberId = parseId(params.id)
  if (!memberId) return jsonError('Member not found', 404)

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
    include: { resume: true },
  })
  if (!member) return jsonError('Member not found', 404)
  return Response.json(memberToDetail(member))
}

export async function PUT(request: NextRequest, { params }: Params) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const memberId = parseId(params.id)
  if (!memberId) return jsonError('Member not found', 404)

  const member = await prisma.teamMember.findUnique({
    where: { id: memberId },
    include: { resume: true },
  })
  if (!member) return jsonError('Member not found', 404)

  const body = (await request.json()) as Record<string, unknown>
  const data: Record<string, unknown> = {}

  const map: Record<string, string> = {
    slug: 'slug',
    name_en: 'nameEn',
    name_fa: 'nameFa',
    role_en: 'roleEn',
    role_fa: 'roleFa',
    short_bio_en: 'shortBioEn',
    short_bio_fa: 'shortBioFa',
    avatar_url: 'avatarUrl',
    email: 'email',
    github: 'github',
    linkedin: 'linkedin',
    telegram: 'telegram',
    sort_order: 'sortOrder',
    is_published: 'isPublished',
  }

  for (const [from, to] of Object.entries(map)) {
    if (body[from] !== undefined) data[to] = body[from]
  }

  if (typeof data.slug === 'string' && data.slug !== member.slug) {
    const exists = await prisma.teamMember.findUnique({ where: { slug: data.slug } })
    if (exists) return jsonError('Slug already exists', 400)
  }

  const updated = await prisma.teamMember.update({
    where: { id: memberId },
    data,
    include: { resume: true },
  })
  return Response.json(memberToDetail(updated))
}

export async function DELETE(request: NextRequest, { params }: Params) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const memberId = parseId(params.id)
  if (!memberId) return jsonError('Member not found', 404)

  const member = await prisma.teamMember.findUnique({ where: { id: memberId } })
  if (!member) return jsonError('Member not found', 404)

  await prisma.teamMember.delete({ where: { id: memberId } })
  return new Response(null, { status: 204 })
}
