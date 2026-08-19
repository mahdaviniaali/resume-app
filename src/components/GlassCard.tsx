'use client'

import { useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface GlassCardProps {
  icon?: string
  title: string
  description?: string
  code?: string
  className?: string
  isContact?: boolean
}

export function GlassCard({
  icon,
  title,
  description,
  code,
  className = '',
  isContact = false,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useReveal(ref)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleContactClick = () => {
    alert('سیگنال دریافت شد. داریم نور را می‌سازیم.')
  }

  return (
    <div
      ref={ref}
      className={`glass-card ${className}`}
      onMouseMove={handleMouseMove}
      style={
        {
          '--mx': `${mousePos.x}px`,
          '--my': `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {icon && (
        <div className="mb-4 font-sans text-xs tracking-[1px] text-[#777]">{icon}</div>
      )}

      <h3
        className={`mb-4 font-display text-2xl font-normal text-white ${
          isContact ? 'text-4xl italic sm:text-5xl' : ''
        }`}
      >
        {title}
      </h3>

      {description && <p className="body-soft">{description}</p>}

      {code && (
        <pre className="mt-6 whitespace-pre-wrap border border-line bg-black/40 p-4 font-mono text-sm leading-roomy text-muted">
          {code}
        </pre>
      )}

      {isContact && (
        <button
          type="button"
          onClick={handleContactClick}
          className="contact-btn mt-8 rounded-full border-none bg-white px-12 py-5 font-sans text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
        >
          ارسال سیگنال ←
        </button>
      )}
    </div>
  )
}
