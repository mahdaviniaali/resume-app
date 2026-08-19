export type LocalizedString =
  | string
  | {
      fa: string
      en: string
    }

export type Language = 'fa' | 'en'

export interface ContactLinks {
  email: string
  telegram: string
  linkedin: string
  github: string
}

export interface SiteSettings {
  brand_name: string
  tagline: string
  contacts: ContactLinks
  home_content: HomeContent
}

export interface HomeContent {
  hero?: Record<string, string>
  beyond?: {
    title: string
    subtitle: string
    lead: string
    stages: { label: string; text: string }[]
  }
  void?: {
    title: string
    subtitle: string
    items: { label: string; title: string; text: string }[]
  }
  crossing?: {
    title: string
    subtitle: string
    steps: { from: string; to: string }[]
  }
  capabilities?: {
    title: string
    subtitle: string
    cards: {
      icon: string
      title: string
      description: string
      code?: string
      span?: number
    }[]
  }
  method?: {
    title: string
    subtitle: string
    steps: { key: string; text: string }[]
  }
  team?: { title: string; subtitle: string }
  contact?: { title: string; subtitle: string; button: string }
}

export interface TeamMember {
  id: number
  slug: string
  name_en: string
  name_fa: string
  role_en: string
  role_fa: string
  short_bio_en: string
  short_bio_fa: string
  avatar_url: string
  email: string
  github: string
  linkedin: string
  telegram: string
  sort_order: number
  is_published: boolean
  resume?: ResumeData | null
}

export interface ResumeProject {
  title: LocalizedString
  tech: string[]
  description: LocalizedString
  features?: LocalizedString[]
  meta?: {
    date?: LocalizedString
    role?: LocalizedString
    link?: string
  }
}

export interface ResumeData {
  personal: {
    name: LocalizedString
    tagline: LocalizedString
    avatar: LocalizedString
    location: LocalizedString
    phone: LocalizedString
    phoneHref: string
    email: string
    badges: LocalizedString[]
  }
  contactsSecondary: {
    type: 'github' | 'linkedin' | 'telegram'
    href: string
    label: LocalizedString
  }[]
  summary: LocalizedString
  experiences: {
    title: LocalizedString
    location: LocalizedString
    date: LocalizedString
    description: LocalizedString
  }[]
  projects: {
    major: ResumeProject[]
    small: ResumeProject[]
  }
  skills: string[]
  education: {
    degree: LocalizedString
    school: LocalizedString
    date: LocalizedString
    details: LocalizedString
  }[]
  certificates: {
    title: LocalizedString
    issuer: LocalizedString
  }[]
  languages: {
    name: LocalizedString
    level: LocalizedString
  }[]
  footer: {
    text: LocalizedString
    backToTop: LocalizedString
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export function getApiBase() {
  return API_BASE.replace(/\/$/, '')
}

export function resolveMediaUrl(url: string) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${getApiBase()}${url.startsWith('/') ? '' : '/'}${url}`
}

export function resolveText(value: LocalizedString | undefined, language: Language): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[language] ?? value.fa ?? value.en ?? ''
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `API ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export function fetchSite() {
  return apiFetch<SiteSettings>('/api/site')
}

export function fetchMembers() {
  return apiFetch<TeamMember[]>('/api/members')
}

export function fetchMember(slug: string) {
  return apiFetch<TeamMember>(`/api/members/${slug}`)
}

export function adminLogin(username: string, password: string) {
  return apiFetch<{ access_token: string; token_type: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function adminFetch<T>(path: string, token: string, init?: RequestInit) {
  return apiFetch<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  })
}
