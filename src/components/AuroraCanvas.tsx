'use client'

import { useEffect, useRef } from 'react'
import { noise } from '@/utils/noise'

interface AuroraBandConfig {
  color: [number, number, number]
  alpha: number
  yRatio: number
  amplitude: number
  speed: number
  thickness: number
  phase: number
}

class AuroraBand {
  private rgb: [number, number, number]
  private alpha: number
  private yRatio: number
  private amplitude: number
  private speed: number
  private thickness: number
  private phase: number
  private points: { x: number; y: number }[] = []
  private currentColor = ''
  private currentY = 0
  private currentAmp = 0
  private currentThickness = 0

  constructor(config: AuroraBandConfig) {
    this.rgb = config.color
    this.alpha = config.alpha
    this.yRatio = config.yRatio
    this.amplitude = config.amplitude
    this.speed = config.speed
    this.thickness = config.thickness
    this.phase = config.phase
  }

  update(
    t: number,
    width: number,
    height: number,
    mouseX: number | null,
    mouseY: number | null,
    scroll: number,
    intensity: number
  ) {
    const wave = Math.sin(scroll * Math.PI * 2 + this.phase)
    const lift = (scroll - 0.5) * height * 0.35
    this.currentY = height * this.yRatio + lift + wave * height * 0.08
    this.currentAmp = this.amplitude * (0.85 + scroll * 0.55 + Math.abs(wave) * 0.2)
    this.currentThickness = this.thickness * (0.9 + intensity * 0.45)

    const alpha = this.alpha * (0.85 + intensity * 0.55)
    this.currentColor = `rgba(${this.rgb[0]}, ${this.rgb[1]}, ${this.rgb[2]}, ${alpha})`

    this.points = []
    const segments = 36
    const scrollWarp = scroll * 0.012

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width
      let baseY =
        this.currentY +
        noise(x, this.currentY, t * this.speed + scroll * 2) * this.currentAmp +
        Math.sin(i * 0.35 + t * this.speed + scroll * 4) * (18 + scroll * 28)

      // horizontal drift with scroll
      const drift = Math.sin(t * 0.4 + this.phase + i * 0.2) * scroll * 30
      const drawX = x + drift

      if (mouseX !== null && mouseY !== null) {
        const dx = drawX - mouseX
        const dist = Math.abs(dx)
        const influence = Math.max(0, 1 - dist / 400)
        const pull = (this.currentY - mouseY) * 0.2
        baseY += pull * influence
      }

      // scroll-driven swirl
      baseY += noise(x * scrollWarp, t, scroll * 3) * scroll * 40

      this.points.push({ x: drawX, y: baseY })
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length < 2) return

    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)

    for (let i = 1; i < this.points.length - 1; i++) {
      const cx = (this.points[i].x + this.points[i + 1].x) / 2
      const cy = (this.points[i].y + this.points[i + 1].y) / 2
      ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, cx, cy)
    }

    ctx.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y)

    ctx.lineWidth = this.currentThickness
    ctx.strokeStyle = this.currentColor
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const scrollRef = useRef(0)
  const smoothScroll = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollRef.current = window.scrollY / max
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // Classic ISEMPTY palette — violet / cyber blue / magenta
    const bands = [
      new AuroraBand({
        color: [138, 43, 226],
        alpha: 0.12,
        yRatio: 0.4,
        amplitude: 150,
        speed: 0.5,
        thickness: 300,
        phase: 0,
      }),
      new AuroraBand({
        color: [0, 191, 255],
        alpha: 0.08,
        yRatio: 0.6,
        amplitude: 180,
        speed: 0.7,
        thickness: 250,
        phase: 1,
      }),
      new AuroraBand({
        color: [255, 20, 147],
        alpha: 0.06,
        yRatio: 0.5,
        amplitude: 200,
        speed: 0.3,
        thickness: 200,
        phase: 2,
      }),
    ]

    const animate = (timestamp: number) => {
      const t = timestamp * 0.001
      smoothScroll.current = lerp(smoothScroll.current, scrollRef.current, 0.06)
      const scroll = smoothScroll.current

      const intensity = 0.4 + Math.sin(scroll * Math.PI) * 0.35

      ctx.fillStyle = `rgba(5, 5, 7, ${0.12 + scroll * 0.05})`
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      ctx.filter = 'blur(60px)'

      bands.forEach((band) => {
        band.update(t, width, height, mouseRef.current.x, mouseRef.current.y, scroll, intensity)
        band.draw(ctx)
      })

      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-screen w-screen"
      aria-hidden
    />
  )
}
