/**
 * Syncs profile.json + mahanProfile.json into the active SQLite DB.
 * Used by local `npm run db:sync` and Vercel build (deploy.db).
 */
try {
  require('dotenv').config()
} catch {
  // optional in CI
}
const { readFileSync, existsSync } = require('fs')
const { createHash } = require('crypto')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db'
}

function sha(text) {
  return createHash('sha256').update(text).digest('hex')
}

function loadResume(relPath) {
  const full = path.join(__dirname, '..', relPath)
  if (!existsSync(full)) return null
  const raw = JSON.parse(readFileSync(full, 'utf-8'))
  return raw.resume || null
}

async function upsert(prisma, slug, resume, fields, createMeta) {
  if (!resume || Object.keys(resume).length === 0) {
    console.log(`skip ${slug}: empty resume`)
    return
  }
  const resumeJson = JSON.stringify(resume)
  let member = await prisma.teamMember.findUnique({
    where: { slug },
    include: { resume: true },
  })

  if (!member && createMeta) {
    member = await prisma.teamMember.create({
      data: {
        slug,
        nameEn: createMeta.nameEn,
        nameFa: createMeta.nameFa,
        roleEn: fields.roleEn,
        roleFa: fields.roleFa,
        shortBioEn: fields.shortBioEn,
        shortBioFa: fields.shortBioFa,
        email: fields.email || '',
        sortOrder: createMeta.sortOrder,
        isPublished: true,
        resume: { create: { dataJson: resumeJson } },
      },
      include: { resume: true },
    })
    console.log(`created ${slug}`)
    return
  }

  if (!member) {
    console.log(`skip ${slug}: member missing`)
    return
  }

  await prisma.teamMember.update({
    where: { id: member.id },
    data: {
      roleEn: fields.roleEn,
      roleFa: fields.roleFa,
      shortBioEn: fields.shortBioEn,
      shortBioFa: fields.shortBioFa,
      ...(fields.email ? { email: fields.email } : {}),
    },
  })

  if (!member.resume) {
    await prisma.resume.create({ data: { memberId: member.id, dataJson: resumeJson } })
    console.log(`created resume ${slug}`)
    return
  }

  if (sha(member.resume.dataJson) !== sha(resumeJson)) {
    await prisma.resume.update({
      where: { memberId: member.id },
      data: { dataJson: resumeJson },
    })
    console.log(`updated resume ${slug}`)
  } else {
    console.log(`unchanged ${slug}`)
  }
}

async function main() {
  const prisma = new PrismaClient()
  try {
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
      console.log('renamed sara → mahan')
    }

    await upsert(
      prisma,
      'ali-mahdavinia',
      loadResume('src/data/profile.json'),
      {
        roleEn: 'AI Systems & Backend Architect',
        roleFa: 'معمار سیستم‌های AI و بک‌اند',
        shortBioEn:
          'Senior development and technical leadership — enterprise RAG, agents on chatbot.ir, and turning business needs into shippable architecture.',
        shortBioFa:
          'توسعهٔ ارشد و مدیریت فنی — RAG سازمانی و ایجنت‌ها روی chatbot.ir، و تبدیل نیاز کسب‌وکار به معماری قابل تحویل.',
      },
    )

    await upsert(
      prisma,
      'mahan-tahmasbi',
      loadResume('src/data/mahanProfile.json'),
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
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
