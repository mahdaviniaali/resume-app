'use client'

import { useInView } from '@/hooks/useInView'
import type { ContactLinks } from '@/lib/api'

interface ContactSectionProps {
  title: string
  subtitle: string
  button: string
  contacts: ContactLinks
}

export function ContactSection({ title, subtitle, button, contacts }: ContactSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.22 })

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
    <section id="contact" className="scroll-mt-24 pb-16 sm:pb-20" ref={ref}>
      <div className={`contact-field ${visible ? 'is-live' : ''}`}>
        <div className="contact-copy">
          <div className="contact-prompt">
            &gt;_<span className="contact-prompt-idx">06</span>
          </div>
          <h2 className="contact-title">{title}</h2>
          <p className="contact-lead">
            <span className="contact-lead-bar" aria-hidden />
            <span>{subtitle}</span>
          </p>

          <a href={mailto} className="contact-cta">
            {button}
          </a>

          {socials.length > 0 ? (
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
          ) : null}
        </div>
      </div>
    </section>
  )
}
