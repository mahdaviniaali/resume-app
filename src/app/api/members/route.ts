export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { ensureSeeded } from '@/lib/seed'
import { memberToPublic } from '@/lib/serializers'

export async function GET() {
  await ensureSeeded()
  const members = await prisma.teamMember.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  })
  return Response.json(members.map(memberToPublic))
}
