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
      className={`mt-28 scroll-mt-24 transition-opacity duration-700 sm:mt-36 ${
        visible ? 'opacity-100' : 'opacity-45'
      }`}
    >
      <SectionHeader index="06" kicker={subtitle} title={title} />

      <ul className="divide-y divide-line border-y border-line">
        {members.map((member, i) => {
          const name = member.name_en || member.name_fa
          const role = member.role_en || member.role_fa
          const bio = member.short_bio_en || member.short_bio_fa
          const initial = name.slice(0, 1)

          return (
            <li key={member.id}>
              <Link
                href={`/team/${member.slug}`}
                className="group grid gap-5 py-10 transition-colors hover:bg-white/[0.025] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:py-12"
                style={{
                  opacity: visible ? 1 : 0.3,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.55s ease ${i * 70}ms, transform 0.55s ease ${i * 70}ms`,
                }}
              >
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden border border-line bg-ink font-display text-xl text-white transition-colors group-hover:border-gold/50">
                  {member.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolveMediaUrl(member.avatar_url)}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-sans text-xl font-medium text-white sm:text-2xl">{name}</h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted">{role}</span>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[#8f8f8f] group-hover:text-[#bdbdbd]">
                    {bio}
                  </p>
                </div>

                <span className="font-mono text-[10px] tracking-[0.18em] text-gold/70 transition-colors group-hover:text-gold">
                  Resume →
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
