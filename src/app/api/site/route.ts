import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, siteToOut } from '@/lib/serializers'

export async function GET() {
  await ensureSeeded()
  const site = await prisma.siteSettings.findFirst()
  if (!site) return jsonError('Site settings not found', 404)
  return Response.json(siteToOut(site))
}
