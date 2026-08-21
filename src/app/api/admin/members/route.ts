export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { emptyResume, ensureSeeded } from '@/lib/seed'
import { jsonError, memberToDetail, memberToPublic } from '@/lib/serializers'

export async function GET(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const members = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  })
  return Response.json(members.map(memberToPublic))
}

export async function POST(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const body = (await request.json()) as {
    slug?: string
    name_en?: string
    name_fa?: string
    role_en?: string
    role_fa?: string
    short_bio_en?: string
    short_bio_fa?: string
    avatar_url?: string
    email?: string
    github?: string
    linkedin?: string
    telegram?: string
    sort_order?: number
    is_published?: boolean
    resume?: Record<string, unknown>
  }

  if (!body.slug || body.slug.length < 2 || !body.name_en || !body.role_en) {
    return jsonError('Missing required fields', 400)
  }

  const exists = await prisma.teamMember.findUnique({ where: { slug: body.slug } })
  if (exists) return jsonError('Slug already exists', 400)

  const nameEn = body.name_en
  const nameFa = body.name_fa || ''
  const roleEn = body.role_en
  const roleFa = body.role_fa || ''
  const email = body.email || ''

  const resumeData =
    body.resume || emptyResume(nameEn, nameFa, roleEn, roleFa, email)

  const member = await prisma.teamMember.create({
    data: {
      slug: body.slug,
      nameEn,
      nameFa,
      roleEn,
      roleFa,
      shortBioEn: body.short_bio_en || '',
      shortBioFa: body.short_bio_fa || '',
      avatarUrl: body.avatar_url || '',
      email,
      github: body.github || '',
      linkedin: body.linkedin || '',
      telegram: body.telegram || '',
      sortOrder: body.sort_order ?? 0,
      isPublished: body.is_published ?? true,
      resume: { create: { dataJson: JSON.stringify(resumeData) } },
    },
    include: { resume: true },
  })

  return Response.json(memberToDetail(member), { status: 201 })
}
