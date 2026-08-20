'use client'

import Link from 'next/link'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { resolveMediaUrl, type TeamMember } from '@/lib/api'

interface TeamSectionProps {
  title: string
  subtitle: string
  members: TeamMember[]
}

export function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <section
      id="team"
      ref={ref}
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-40 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="06" kicker={subtitle} title={title} />

      <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
        {members.map((member, i) => {
          const name = member.name_en || member.name_fa
          const role = member.role_en || member.role_fa
          const bio = member.short_bio_en || member.short_bio_fa
          const initial = name.slice(0, 1)

          return (
            <li
              key={member.id}
              style={{
                opacity: visible ? 1 : 0.3,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms`,
              }}
            >
              <Link
                href={`/team/${member.slug}`}
                className="group relative flex h-full flex-col overflow-hidden border border-line bg-ink/30 p-6 transition-colors duration-500 hover:border-gold/45 hover:bg-gold/[0.03] sm:p-8"
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden border border-line bg-void font-display text-3xl text-white transition-transform duration-500 group-hover:scale-[1.03] sm:h-24 sm:w-24">
                    {member.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveMediaUrl(member.avatar_url)}
                        alt={name}
                        className="h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                      />
                    ) : (
                      initial
                    )}
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-gold/70 transition-colors group-hover:text-gold">
                    Resume →
                  </span>
                </div>

                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{role}</p>
                <h3 className="mb-4 font-display text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-3xl">
                  {name}
                </h3>
                <p className="mt-auto max-w-sm font-inter text-sm font-light leading-7 text-[#8f8f8f] group-hover:text-[#bdbdbd]">
                  {bio}
                </p>

                <span
                  className="pointer-events-none absolute -bottom-4 -right-2 select-none font-display text-7xl font-black text-white/[0.03] transition-colors group-hover:text-gold/[0.08]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
