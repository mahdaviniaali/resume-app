import { readFileSync, existsSync } from 'fs'
import path from 'path'

import { hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { homeContent } from '@/data/homeContent'
import { syncProfileResumes } from '@/lib/profileSync'

export const DEFAULT_HOME = homeContent

export function emptyResume(
  nameEn: string,
  nameFa: string,
  roleEn: string,
  roleFa: string,
  email = '',
): Record<string, unknown> {
  return {
    personal: {
      name: { fa: nameFa || nameEn, en: nameEn },
      tagline: { fa: roleFa || roleEn, en: roleEn },
      avatar: { fa: (nameFa || nameEn).slice(0, 1), en: nameEn.slice(0, 1) },
      location: { fa: 'تهران', en: 'Tehran' },
      phone: { fa: '', en: '' },
      phoneHref: '',
      email,
      badges: [],
    },
    contactsSecondary: [],
    summary: { fa: '', en: '' },
    experiences: [] as Record<string, unknown>[],
    projects: { major: [], small: [] },
    skills: [] as string[],
    education: [],
    certificates: [],
    languages: [],
    references: [],
    footer: {
      text: { fa: 'ISEMPTY', en: 'ISEMPTY' },
      backToTop: { fa: 'بازگشت به بالا', en: 'Back to top' },
    },
  }
}

let seedPromise: Promise<void> | null = null

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = seedIfEmpty().catch((err) => {
      seedPromise = null
      throw err
    })
  }
  await seedPromise
  // Profile JSON is source of truth — keep DB resumes aligned after every API boot path.
  await syncProfileResumes()
}

function loadMahanResumeFromProfile(): Record<string, unknown> | null {
  const profilePath = path.join(process.cwd(), 'src', 'data', 'mahanProfile.json')
  if (!existsSync(profilePath)) return null
  const raw = JSON.parse(readFileSync(profilePath, 'utf-8')) as {
    resume?: Record<string, unknown>
  }
  if (!raw.resume || Object.keys(raw.resume).length === 0) return null
  return raw.resume
}

function buildMahanResume() {
  const fromFile = loadMahanResumeFromProfile()
  if (fromFile) return fromFile

  return emptyResume(
    'Mahan Tahmasbi',
    'ماهان طهماسبی',
    'Backend Developer & System Architect',
    'توسعه‌دهنده بک‌اند و معمار سیستم',
    'mahan.tahmasbi85@gmail.com',
  )
}

const MAHAN_MEMBER = {
  slug: 'mahan-tahmasbi',
  nameEn: 'Mahan Tahmasbi',
  nameFa: 'ماهان طهماسبی',
  roleEn: 'Backend Developer & System Architect',
  roleFa: 'توسعه‌دهنده بک‌اند و معمار سیستم',
  shortBioEn:
    'Backend and systems — scalable APIs, DDD, and taking products from build to market with SEO and tech sales.',
  shortBioFa:
    'بک‌اند و سیستم — API مقیاس‌پذیر، DDD، و رساندن محصول از ساخت تا بازار با سئو و فروش فنی.',
  email: 'mahan.tahmasbi85@gmail.com',
  sortOrder: 1,
  isPublished: true,
} as const

async function seedIfEmpty() {
  const [existingAdmin, members] = await Promise.all([
    prisma.adminUser.findFirst(),
    prisma.teamMember.findMany({ select: { slug: true } }),
  ])
  const existingSlugs = new Set(members.map((m) => m.slug))
  const hasCore =
    existingAdmin &&
    existingSlugs.has('ali-mahdavinia') &&
    existingSlugs.has('mahan-tahmasbi') &&
    existingSlugs.has('reza-karimi')
  if (hasCore) {
    const site = await prisma.siteSettings.findFirst()
    if (site) return
  }

  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  const passwordHash = await hashPassword(password)

  const contacts = {
    email: 'alimahdavinia125@gmail.com',
    telegram: 'https://t.me/mahdaviniaali',
    linkedin: 'https://www.linkedin.com/in/mahdaviniaali/',
    github: 'https://github.com/mahdaviniaali',
  }

  let aliResume: Record<string, unknown> = {}
  const profilePath = path.join(process.cwd(), 'src', 'data', 'profile.json')
  if (existsSync(profilePath)) {
    const raw = JSON.parse(readFileSync(profilePath, 'utf-8')) as {
      resume?: Record<string, unknown>
      landing?: { contacts?: { type: string; href: string }[] }
    }
    aliResume = raw.resume || {}
    for (const c of raw.landing?.contacts || []) {
      if (c.type in contacts && c.href) {
        ;(contacts as Record<string, string>)[c.type] =
          c.type === 'email' ? c.href.replace('mailto:', '') : c.href
      }
    }
  }

  const emailClean = contacts.email.replace('mailto:', '')

  const mahanResume = buildMahanResume()

  const rezaResume = emptyResume(
    'Reza Karimi',
    'رضا کریمی',
    'Frontend Systems Engineer',
    'مهندس سیستم‌های فرانت‌اند',
    'reza@genesis.dev',
  )
  rezaResume.summary = {
    en: 'Frontend systems engineer specializing in design systems and operational dashboards for multi-tenant products.',
    fa: 'مهندس فرانت با تمرکز روی دیزاین‌سیستم و داشبوردهای عملیاتی محصولات چندمستاجره.',
  }
  rezaResume.skills = ['TypeScript', 'React / Next.js', 'Design Systems', 'Accessibility', 'Performance']
  rezaResume.experiences = [
    {
      title: { en: 'Frontend Engineer', fa: 'مهندس فرانت‌اند' },
      location: { en: 'ISEMPTY', fa: 'ISEMPTY' },
      date: { en: '2023 — Present', fa: '۱۴۰۲ — اکنون' },
      description: {
        en: 'Owns client shells for SaaS consoles, focusing on state clarity and fast paths for power users.',
        fa: 'مالک شِل کلاینت کنسول‌های SaaS با تمرکز روی وضوح state و مسیرهای سریع برای کاربران حرفه‌ای.',
      },
    },
  ]

  await prisma.$transaction(async (tx) => {
    if (!existingAdmin) {
      await tx.adminUser.create({
        data: { username, passwordHash },
      })
    }

    const site = await tx.siteSettings.findFirst()
    if (!site) {
      await tx.siteSettings.create({
        data: {
          brandName: 'ISEMPTY',
          tagline: 'From the void of is empty; We code the light.',
          email: emailClean,
          telegram: contacts.telegram,
          linkedin: contacts.linkedin,
          github: contacts.github,
          homeContent: JSON.stringify(DEFAULT_HOME),
        },
      })
    }

    const existingSlugsInTx = new Set(
      (await tx.teamMember.findMany({ select: { slug: true } })).map((m) => m.slug),
    )

    if (!existingSlugsInTx.has('ali-mahdavinia')) {
      await tx.teamMember.create({
        data: {
          slug: 'ali-mahdavinia',
          nameEn: 'Ali Mahdavinia',
          nameFa: 'علی مهدوی‌نیا',
          roleEn: 'AI Systems & Backend Architect',
          roleFa: 'معمار سیستم‌های AI و بک‌اند',
          shortBioEn:
            'Senior development and technical leadership — enterprise RAG, agents on chatbot.ir, and turning business needs into shippable architecture.',
          shortBioFa:
            'توسعهٔ ارشد و مدیریت فنی — RAG سازمانی و ایجنت‌ها روی chatbot.ir، و تبدیل نیاز کسب‌وکار به معماری قابل تحویل.',
          avatarUrl: '',
          email: emailClean,
          github: contacts.github,
          linkedin: contacts.linkedin,
          telegram: contacts.telegram,
          sortOrder: 0,
          isPublished: true,
          resume: {
            create: {
              dataJson: JSON.stringify(
                Object.keys(aliResume).length
                  ? aliResume
                  : emptyResume(
                      'Ali Mahdavinia',
                      'علی مهدوی‌نیا',
                      'AI Systems & Backend Architect',
                      'معمار سیستم‌های AI و بک‌اند',
                      emailClean,
                    ),
              ),
            },
          },
        },
      })
    }

    if (!existingSlugsInTx.has('mahan-tahmasbi')) {
      await tx.teamMember.create({
        data: {
          ...MAHAN_MEMBER,
          resume: { create: { dataJson: JSON.stringify(mahanResume) } },
        },
      })
    }

    if (!existingSlugsInTx.has('reza-karimi')) {
      await tx.teamMember.create({
        data: {
          slug: 'reza-karimi',
          nameEn: 'Reza Karimi',
          nameFa: 'رضا کریمی',
          roleEn: 'Frontend Systems Engineer',
          roleFa: 'مهندس سیستم‌های فرانت‌اند',
          shortBioEn:
            'Builds calm, high-signal interfaces on top of complex backends — clarity for operators and customers.',
          shortBioFa: 'رابط‌های آرام و خوانا روی بک‌اندهای پیچیده — وضوح برای اپراتور و مشتری.',
          sortOrder: 2,
          isPublished: true,
          email: 'reza@genesis.dev',
          github: 'https://github.com',
          resume: { create: { dataJson: JSON.stringify(rezaResume) } },
        },
      })
    }
  })
}
