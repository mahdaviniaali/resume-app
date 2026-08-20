import { ensureSeeded } from '@/lib/seed'

export async function GET() {
  await ensureSeeded()
  return Response.json({ status: 'ok' })
}
