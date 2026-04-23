import rawProfile from '@/data/profile.json';

export type Language = 'fa' | 'en';

export type LocalizedString =
  | string
  | {
      fa: string;
      en: string;
    };

export interface LandingContact {
  type: 'email' | 'telegram' | 'linkedin' | 'github' | 'whatsapp';
  label: string;
  href: string;
}

export interface LandingData {
  name: string;
  tagline: string;
  skills: string[];
  contacts: LandingContact[];
  resumeLink: {
    label: string;
    href: string;
  };
}

export interface ResumeProject {
  title: LocalizedString;
  tech: string[];
  description: LocalizedString;
  features?: LocalizedString[];
  meta?: {
    date?: LocalizedString;
    role?: LocalizedString;
    link?: string;
  };
}

export interface ResumeData {
  personal: {
    name: LocalizedString;
    tagline: LocalizedString;
    avatar: LocalizedString;
    location: LocalizedString;
    phone: LocalizedString;
    phoneHref: string;
    email: string;
    badges: LocalizedString[];
  };
  contactsSecondary: {
    type: 'github' | 'linkedin' | 'telegram';
    href: string;
    label: LocalizedString;
  }[];
  summary: LocalizedString;
  experiences: {
    title: LocalizedString;
    location: LocalizedString;
    date: LocalizedString;
    description: LocalizedString;
  }[];
  projects: {
    major: ResumeProject[];
    small: ResumeProject[];
  };
  skills: string[];
  education: {
    degree: LocalizedString;
    school: LocalizedString;
    date: LocalizedString;
    details: LocalizedString;
  }[];
  certificates: {
    title: LocalizedString;
    issuer: LocalizedString;
  }[];
  languages: {
    name: LocalizedString;
    level: LocalizedString;
  }[];
  footer: {
    text: LocalizedString;
    backToTop: LocalizedString;
  };
}

export interface ProfileData {
  landing: LandingData;
  resume: ResumeData;
}

const profileData = rawProfile as ProfileData;

export function getProfileData(): ProfileData {
  return profileData;
}

export function resolveText(value: LocalizedString, language: Language): string {
  if (typeof value === 'string') {
    return value;
  }

  return value[language] ?? value.fa ?? value.en ?? '';
}

