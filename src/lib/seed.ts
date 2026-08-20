import { readFileSync, existsSync } from 'fs'
import path from 'path'

import { hashPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const DEFAULT_HOME = {
  hero: {
    eyebrow: '[ پروتکل جنسیس ]',
    line1: 'از خلأ',
    line2_prefix: 'از',
    line2_stroke: 'خالی است',
    line3_prefix: 'ما می‌سازیم',
    line3_accent: 'نور',
    description:
      'سیستم‌های درهم و مسئله‌های سخت را به معماری شفاف تبدیل می‌کنیم — SaaS چندمستاجره، طراحی دامنه، و هسته‌های پرسرعت.',
  },
  void: {
    title: 'خلأ',
    subtitle: 'جایی که بیشتر محصول‌ها گیر می‌کنند',
    items: [
      {
        label: '۰۱',
        title: 'منطق پراکنده',
        text: 'قواعد کسب‌وکار زیر UI، اسکریپت و دانش شفاهی دفن شده — چیزی برای تغییر امن نیست.',
      },
      {
        label: '۰۲',
        title: 'چندمستأجره‌ی شکننده',
        text: 'فورک‌های سفارشی برای هر مشتری، به‌جای یک زیربنای واقعی چندمستاجره.',
      },
      {
        label: '۰۳',
        title: 'سیستم‌های مبهم',
        text: 'بدون مرز، بدون رویداد، بدون مشاهده‌پذیری — فقط آتش‌نشانی.',
      },
    ],
  },
  crossing: {
    title: 'گذار',
    subtitle: 'از آشوب تا سیستمی که می‌ماند',
    steps: [
      { from: 'نیازمندی‌های درهم', to: 'مدل دامنه دقیق' },
      { from: 'مونولیت شکننده', to: 'باندد کانتکست' },
      { from: 'حالت خالی', to: 'جریان‌های روشن' },
      { from: 'دیباگ قهرمانانه', to: 'پایپ‌لاین مشاهده‌پذیر' },
    ],
  },
  capabilities: {
    title: 'توانایی‌ها',
    subtitle: 'آنچه می‌سازیم',
    cards: [
      {
        icon: '۰۱ // چندمستاجره',
        title: 'اکوسیستم SaaS',
        description: 'زیرساخت ایزوله، امن و مقیاس‌پذیر — یک بنیاد، قلمروهای بسیار.',
        span: 2,
      },
      {
        icon: '۰۲ // DDD',
        title: 'معماری سیستم',
        description: 'نظم روی آشوب. کانتکست‌های خالص و مقیاس‌پذیر.',
        span: 1,
      },
      {
        icon: '۰۳ // محصول',
        title: 'ذهنیت محصول',
        description: 'هر خط کد برای نبض واقعی محصول است.',
        span: 1,
      },
      {
        icon: 'هسته منطق // پایتون و جنگو',
        title: 'منطق کسب‌وکار',
        description: 'منطق پیچیدهٔ چندمستاجره با سرعت آزموده‌شده.',
        code: 'def create_reality(req):\n    if req.void.is_empty:\n        return Architect.build(SaaS())',
        span: 2,
      },
      {
        icon: 'هسته سیستم // Rust Async',
        title: 'کارایی بالا',
        description: 'انتزاع بدون هزینه؛ جایی که حافظه و سرعت حیاتی‌اند.',
        code: 'async fn illuminate(s: &mut Void) {\n    s.extract_truth().await;\n    Light::from(s)\n}',
        span: 2,
      },
    ],
  },
  method: {
    title: 'روش',
    subtitle: 'پروتکل کار ما',
    steps: [
      {
        key: 'کشف',
        text: 'نقشهٔ درهم‌ریختگی. مصاحبه با دامنه. نام‌گذاری آنچه واقعاً درد می‌کند.',
      },
      {
        key: 'مدل',
        text: 'رسم باندد کانتکست. جدا کردن مسیر نوشتن و خواندن وقتی مقیاس می‌طلبد.',
      },
      {
        key: 'ساخت',
        text: 'سرویس‌های ماژولار — جنگو برای سرعت محصول، Rust وقتی لبه تیز است.',
      },
      {
        key: 'روشنی',
        text: 'مستند، مشاهده‌پذیر، و تحویل سیستمی که تیم مالک آن باشد.',
      },
    ],
  },
  team: {
    title: 'حلقه',
    subtitle: 'معماران نادیده',
  },
  contact: {
    title: 'بیایید نور را ببافیم.',
    subtitle: 'آماده‌اید خلأ را پشت سر بگذارید؟ یک سیگنال بفرستید.',
    button: 'ارسال سیگنال ←',
  },
}

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
    footer: {
      text: { fa: 'Genesis', en: 'Genesis' },
      backToTop: { fa: 'بازگشت به بالا', en: 'Back to top' },
    },
  }
}

let seeded = false
let seedPromise: Promise<void> | null = null

export async function ensureSeeded() {
  if (seeded) return
  if (!seedPromise) {
    seedPromise = seedIfEmpty()
      .then(() => {
        seeded = true
      })
      .catch((err) => {
        seedPromise = null
        throw err
      })
  }
  return seedPromise
}

async function seedIfEmpty() {
  const [existingAdmin, members] = await Promise.all([
    prisma.adminUser.findFirst(),
    prisma.teamMember.findMany({ select: { slug: true } }),
  ])
  const existingSlugs = new Set(members.map((m) => m.slug))
  const hasCore =
    existingAdmin &&
    existingSlugs.has('ali-mahdavinia') &&
    existingSlugs.has('sara-nokhavat') &&
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

  const saraResume = emptyResume(
    'Sara Nokhavat',
    'سارا نخاوت',
    'Product & Domain Strategist',
    'استراتژیست محصول و دامنه',
    'sara@genesis.dev',
  )
  saraResume.summary = {
    en: 'Product strategist focused on domain clarity. Bridges founders and engineers so Genesis ships systems that match the real business — not a guess.',
    fa: 'استراتژیست محصول با تمرکز روی شفافیت دامنه. پل بین بنیان‌گذار و مهندس تا سیستم با واقعیت بیزینس هم‌خوان باشد.',
  }
  saraResume.skills = [
    'Domain Workshops',
    'User Research',
    'PRD / Spec Writing',
    'SaaS Roadmaps',
    'Stakeholder Alignment',
  ]
  saraResume.experiences = [
    {
      title: { en: 'Product Strategist', fa: 'استراتژیست محصول' },
      location: { en: 'Genesis', fa: 'جنسیس' },
      date: { en: '2024 — Present', fa: '۱۴۰۳ — اکنون' },
      description: {
        en: 'Runs discovery workshops, shapes backlog language, and keeps engineering aligned with revenue-critical flows.',
        fa: 'ورکشاپ کشف، زبان بک‌لاگ و هم‌راستایی مهندسی با جریان‌های حیاتی درآمد.',
      },
    },
  ]

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
      location: { en: 'Genesis', fa: 'جنسیس' },
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
          brandName: 'جنسیس',
          tagline: 'از خلأِ خالی است؛ ما نور را می‌سازیم.',
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
          roleEn: 'Backend & System Architect',
          roleFa: 'معمار سیستم و بک‌اند',
          shortBioEn:
            'Leads multi-tenant SaaS and domain-driven backends — turning messy product ideas into durable systems.',
          shortBioFa:
            'رهبری بک‌اند SaaS چندمستاجره و معماری دامنه — تبدیل ایده‌های مبهم به سیستم‌های پایدار.',
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
                      'Backend & System Architect',
                      'معمار سیستم و بک‌اند',
                      emailClean,
                    ),
              ),
            },
          },
        },
      })
    }

    if (!existingSlugsInTx.has('sara-nokhavat')) {
      await tx.teamMember.create({
        data: {
          slug: 'sara-nokhavat',
          nameEn: 'Sara Nokhavat',
          nameFa: 'سارا نخاوت',
          roleEn: 'Product & Domain Strategist',
          roleFa: 'استراتژیست محصول و دامنه',
          shortBioEn:
            'Turns ambiguous briefs into crisp requirements and domain language the whole team can ship against.',
          shortBioFa: 'بریف‌های مبهم را به نیازمندی و زبان دامنه شفاف برای کل تیم تبدیل می‌کند.',
          sortOrder: 1,
          isPublished: true,
          email: 'sara@genesis.dev',
          resume: { create: { dataJson: JSON.stringify(saraResume) } },
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
