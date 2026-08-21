export const dynamic = 'force-dynamic'

import { randomUUID } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { NextRequest } from 'next/server'

import { requireAdmin } from '@/lib/auth'
import { ensureSeeded } from '@/lib/seed'
import { jsonError } from '@/lib/serializers'

const ALLOWED = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

export async function POST(request: NextRequest) {
  await ensureSeeded()
  const admin = await requireAdmin(request)
  if (!admin) return jsonError('Unauthorized', 401)

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return jsonError('No file uploaded', 400)
  }

  const original = file.name || 'upload.bin'
  const suffix = path.extname(original).toLowerCase() || '.bin'
  if (!ALLOWED.has(suffix)) {
    return jsonError('Unsupported file type', 400)
  }

  const name = `${randomUUID().replace(/-/g, '')}${suffix}`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(uploadDir, name), buffer)

  return Response.json({ url: `/uploads/${name}` })
}
