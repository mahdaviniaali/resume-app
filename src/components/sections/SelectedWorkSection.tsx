'use client'

import Link from 'next/link'
import { useEffect, useState, type CSSProperties } from 'react'
import { SectionHeader } from '@/components/SectionHeader'
import { useInView } from '@/hooks/useInView'
import { workFocus, workHome } from '@/data/workContent'

const MARKS: Record<string, string> = {
  agents: 'real workflows',
  b2b: 'staged ops',
  saas: 'past the demo',
  systems: 'speed and load',
}

function highlightPhrase(text: string, phrase?: string) {
  if (!phrase) return text
  const i = text.toLowerCase().indexOf(phrase.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="work-mark">{text.slice(i, i + phrase.length)}</em>
      {text.slice(i + phrase.length)}
    </>
  )
}

/** Focus lanes — open field, same craft as Beyond / Leverage; cases live on /work */
export function SelectedWorkSection() {
  const { ref, visible } = useInView<HTMLElement>({ threshold: 0.2 })
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!visible) return
    setLive(true)
  }, [visible])

  return (
    <section id="work" className="scroll-mt-24" ref={ref}>
      <SectionHeader
        index="03"
        kicker={workHome.subtitle}
        title={workHome.title}
        lead={workHome.lead}
        leadHighlight="hold past the demo"
      />

      <div className={`work-soft ${live ? 'is-on' : ''}`}>
        <div className="work-wash" aria-hidden />
        <div className="work-wash work-wash-b" aria-hidden />

        <ul className="work-lanes">
          {workFocus.map((item, i) => (
            <li
              key={item.id}
              className="work-lane"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="work-lane-idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="work-lane-body">
                <h3 className="work-lane-label">{item.label}</h3>
                <p className="work-lane-blurb">
                  {highlightPhrase(item.blurb, MARKS[item.id])}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/work" className="work-more">
          Full case list →
        </Link>
      </div>
    </section>
  )
}
