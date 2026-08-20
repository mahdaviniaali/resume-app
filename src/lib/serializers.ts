import type { TeamMember } from '@prisma/client'

type SiteRow = {
  brandName: string
  tagline: string
  email: string
  telegram: string
  linkedin: string
  github: string
  homeContent: string
}

type MemberWithResume = TeamMember & {
  resume?: { dataJson: string } | null
}

function parseJson(raw: string | null | undefined, fallback: Record<string, unknown> = {}) {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return fallback
  }
}

export function siteToOut(site: SiteRow) {
  return {
    brand_name: site.brandName,
    tagline: site.tagline,
    contacts: {
      email: site.email,
      telegram: site.telegram,
      linkedin: site.linkedin,
      github: site.github,
    },
    home_content: parseJson(site.homeContent, {}),
  }
}

export function memberToPublic(m: TeamMember) {
  return {
    id: m.id,
    slug: m.slug,
    name_en: m.nameEn,
    name_fa: m.nameFa,
    role_en: m.roleEn,
    role_fa: m.roleFa,
    short_bio_en: m.shortBioEn,
    short_bio_fa: m.shortBioFa,
    avatar_url: m.avatarUrl,
    email: m.email,
    github: m.github,
    linkedin: m.linkedin,
    telegram: m.telegram,
    sort_order: m.sortOrder,
    is_published: m.isPublished,
  }
}

export function memberToDetail(m: MemberWithResume) {
  return {
    ...memberToPublic(m),
    resume: m.resume ? parseJson(m.resume.dataJson, {}) : null,
  }
}

export function jsonError(detail: string, status: number) {
  return Response.json({ detail }, { status })
}
