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
      <div className="stage-panel contact-panel">
        <div className="contact-nebula" aria-hidden />
        <div className="contact-nebula contact-nebula-b" aria-hidden />

        <div className="contact-copy">
          <div className="mb-3 font-mono text-lg tracking-[0.14em] text-gold">
            &gt;_<span className="ms-2 text-[10px] tracking-[0.2em] text-muted">07</span>
          </div>
          <h2 className="contact-title">{title}</h2>
          <p className="contact-lead">
            <span className="contact-lead-bar" aria-hidden />
            <span>{subtitle}</span>
          </p>

          <a href={mailto} className="contact-cta">
            {button}
          </a>

          <ul className="contact-socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="contact-social"
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
