export const dynamic = 'force-dynamic'

import { ensureSeeded } from '@/lib/seed'

export async function GET() {
  await ensureSeeded()
  return Response.json({ status: 'ok' })
}
