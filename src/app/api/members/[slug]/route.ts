export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { jsonError, memberToDetail } from '@/lib/serializers'

type Params = { params: { slug: string } }

export async function GET(_request: Request, { params }: Params) {
  await ensureSeeded()
  const member = await prisma.teamMember.findFirst({
    where: { slug: params.slug, isPublished: true },
    include: { resume: true },
  })
  if (!member) return jsonError('Member not found', 404)
  return Response.json(memberToDetail(member))
}
