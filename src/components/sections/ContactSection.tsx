'use client'

import type { ContactLinks } from '@/lib/api'

interface ContactSectionProps {
  title: string
  subtitle: string
  button: string
  contacts: ContactLinks
}

export function ContactSection({ title, subtitle, button, contacts }: ContactSectionProps) {
  const mailto = contacts.email
    ? `mailto:${contacts.email}?subject=${encodeURIComponent('ISEMPTY')}`
    : '#team'

  const socials = [
    contacts.email ? { label: 'Email', href: `mailto:${contacts.email}` } : null,
    contacts.telegram ? { label: 'Telegram', href: contacts.telegram } : null,
    contacts.linkedin ? { label: 'LinkedIn', href: contacts.linkedin } : null,
    contacts.github ? { label: 'GitHub', href: contacts.github } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <section id="contact" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mb-3 font-mono text-lg tracking-[0.14em] text-gold">
        &gt;_<span className="ms-2 text-[10px] tracking-[0.2em] text-muted">07</span>
      </div>
      <h2 className="max-w-[560px] font-display text-[clamp(1.75rem,3.5vw,2.65rem)] font-extrabold uppercase leading-[1.05] tracking-[0.14em] text-white">
        {title}
      </h2>
      <p className="mt-5 flex max-w-[28rem] items-start gap-3 font-quote text-[0.95rem] font-light leading-roomy tracking-[0.03em] text-[#cfcfcf]">
        <span className="mt-1 inline-block h-9 w-px shrink-0 bg-gold" aria-hidden />
        <span>{subtitle}</span>
      </p>

      <a
        href={mailto}
        className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold transition hover:text-gold-bright"
      >
        {button}
      </a>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              className="transition-colors hover:text-white"
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
