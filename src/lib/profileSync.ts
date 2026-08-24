import { createHash } from 'crypto'
import { existsSync, readFileSync, statSync } from 'fs'
import path from 'path'

import { prisma } from '@/lib/db'

type MemberFields = {
  roleEn: string
  roleFa: string
  shortBioEn: string
  shortBioFa: string
  email?: string
  github?: string
  linkedin?: string
  telegram?: string
}

type GlobalSync = {
  __profileSyncPromise?: Promise<void>
  __profileSyncStamp?: string
}

const g = globalThis as unknown as GlobalSync

function sha(text: string) {
  return createHash('sha256').update(text).digest('hex')
}

function readJson(filePath: string): Record<string, unknown> | null {
  if (!existsSync(filePath)) return null
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8')) as Record<string, unknown>
  } catch {
    return null
  }
}

function fileStamp(filePath: string): string {
  if (!existsSync(filePath)) return 'missing'
  const st = statSync(filePath)
  return `${st.mtimeMs}:${st.size}`
}

async function upsertMemberResume(
  slug: string,
  resume: Record<string, unknown>,
  fields: MemberFields,
  createIfMissing?: {
    nameEn: string
    nameFa: string
    sortOrder: number
  },
) {
  const resumeJson = JSON.stringify(resume)
  const member = await prisma.teamMember.findUnique({
    where: { slug },
    include: { resume: true },
  })

  if (!member) {
    if (!createIfMissing) return
    await prisma.teamMember.create({
      data: {
        slug,
        nameEn: createIfMissing.nameEn,
        nameFa: createIfMissing.nameFa,
        roleEn: fields.roleEn,
        roleFa: fields.roleFa,
        shortBioEn: fields.shortBioEn,
        shortBioFa: fields.shortBioFa,
        email: fields.email || '',
        github: fields.github || '',
        linkedin: fields.linkedin || '',
        telegram: fields.telegram || '',
        sortOrder: createIfMissing.sortOrder,
        isPublished: true,
        resume: { create: { dataJson: resumeJson } },
      },
    })
    return
  }

  const memberNeedsUpdate =
    member.roleEn !== fields.roleEn ||
    member.roleFa !== fields.roleFa ||
    member.shortBioEn !== fields.shortBioEn ||
    member.shortBioFa !== fields.shortBioFa ||
    (fields.email !== undefined && member.email !== fields.email)

  if (memberNeedsUpdate) {
    await prisma.teamMember.update({
      where: { id: member.id },
      data: {
        roleEn: fields.roleEn,
        roleFa: fields.roleFa,
        shortBioEn: fields.shortBioEn,
        shortBioFa: fields.shortBioFa,
        ...(fields.email !== undefined ? { email: fields.email } : {}),
        ...(fields.github !== undefined ? { github: fields.github } : {}),
        ...(fields.linkedin !== undefined ? { linkedin: fields.linkedin } : {}),
        ...(fields.telegram !== undefined ? { telegram: fields.telegram } : {}),
      },
    })
  }

  if (!member.resume) {
    await prisma.resume.create({
      data: { memberId: member.id, dataJson: resumeJson },
    })
    return
  }

  if (sha(member.resume.dataJson) !== sha(resumeJson)) {
    await prisma.resume.update({
      where: { memberId: member.id },
      data: { dataJson: resumeJson },
    })
  }
}

async function syncAli() {
  const profilePath = path.join(process.cwd(), 'src', 'data', 'profile.json')
  const raw = readJson(profilePath)
  const resume = (raw?.resume || null) as Record<string, unknown> | null
  if (!resume || Object.keys(resume).length === 0) return

  await upsertMemberResume(
    'ali-mahdavinia',
    resume,
    {
      roleEn: 'Senior Backend & AI Systems Developer',
      roleFa: 'توسعه‌دهنده ارشد بک‌اند و سیستم‌های AI',
      shortBioEn:
        'Senior backend work on enterprise RAG, organizational permissioning, and agents on chatbot.ir — from business need to reliable delivery.',
      shortBioFa:
        'توسعهٔ ارشد بک‌اند روی RAG سازمانی، پرمیشن‌بندی و ایجنت‌ها در chatbot.ir — از نیاز کسب‌وکار تا تحویل پایدار.',
    },
  )
}

async function syncMahan() {
  const profilePath = path.join(process.cwd(), 'src', 'data', 'mahanProfile.json')
  const raw = readJson(profilePath)
  const resume = (raw?.resume || null) as Record<string, unknown> | null
  if (!resume || Object.keys(resume).length === 0) return

  // Legacy slug rename path
  const sara = await prisma.teamMember.findUnique({ where: { slug: 'sara-nokhavat' } })
  if (sara) {
    await prisma.teamMember.update({
      where: { id: sara.id },
      data: {
        slug: 'mahan-tahmasbi',
        nameEn: 'Mahan Tahmasbi',
        nameFa: 'ماهان طهماسبی',
      },
    })
  }

  await upsertMemberResume(
    'mahan-tahmasbi',
    resume,
    {
      roleEn: 'Backend Developer & System Architect',
      roleFa: 'توسعه‌دهنده بک‌اند و معمار سیستم',
      shortBioEn:
        'Backend and systems — scalable APIs, DDD, and taking products from build to market with SEO and tech sales.',
      shortBioFa:
        'بک‌اند و سیستم — API مقیاس‌پذیر، DDD، و رساندن محصول از ساخت تا بازار با سئو و فروش فنی.',
      email: 'mahan.tahmasbi85@gmail.com',
    },
    {
      nameEn: 'Mahan Tahmasbi',
      nameFa: 'ماهان طهماسبی',
      sortOrder: 1,
    },
  )
}

async function runProfileSync() {
  await syncAli()
  await syncMahan()
}

/** Sync profile JSON → DB. Skips if files unchanged in this process; single-flights concurrent calls. */
export async function syncProfileResumes() {
  const stamp = [
    fileStamp(path.join(process.cwd(), 'src', 'data', 'profile.json')),
    fileStamp(path.join(process.cwd(), 'src', 'data', 'mahanProfile.json')),
  ].join('|')

  if (g.__profileSyncStamp === stamp && !g.__profileSyncPromise) return

  if (g.__profileSyncPromise) {
    await g.__profileSyncPromise
    return
  }

  g.__profileSyncPromise = runProfileSync()
    .then(() => {
      g.__profileSyncStamp = stamp
    })
    .finally(() => {
      g.__profileSyncPromise = undefined
    })

  await g.__profileSyncPromise
}

/** Force sync regardless of in-memory stamp (CLI / build). */
export async function syncProfileResumesForced() {
  g.__profileSyncStamp = undefined
  await runProfileSync()
  g.__profileSyncStamp = [
    fileStamp(path.join(process.cwd(), 'src', 'data', 'profile.json')),
    fileStamp(path.join(process.cwd(), 'src', 'data', 'mahanProfile.json')),
  ].join('|')
}
