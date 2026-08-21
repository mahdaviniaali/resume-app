export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, siteToOut } from '@/lib/serializers'

export async function GET(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const site = await prisma.siteSettings.findFirst()
  if (!site) return jsonError('Site settings not found', 404)
  return Response.json(siteToOut(site))
}

export async function PUT(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const site = await prisma.siteSettings.findFirst()
  if (!site) return jsonError('Site settings not found', 404)

  const body = (await request.json()) as Record<string, unknown>
  const data: {
    brandName?: string
    tagline?: string
    email?: string
    telegram?: string
    linkedin?: string
    github?: string
    homeContent?: string
  } = {}

  if (typeof body.brand_name === 'string') data.brandName = body.brand_name
  if (typeof body.tagline === 'string') data.tagline = body.tagline
  if (typeof body.email === 'string') data.email = body.email
  if (typeof body.telegram === 'string') data.telegram = body.telegram
  if (typeof body.linkedin === 'string') data.linkedin = body.linkedin
  if (typeof body.github === 'string') data.github = body.github
  if (body.home_content !== undefined) {
    data.homeContent = JSON.stringify(body.home_content)
  }

  const updated = await prisma.siteSettings.update({
    where: { id: site.id },
    data,
  })
  return Response.json(siteToOut(updated))
}
