'use client'

import { useEffect, useRef } from 'react'
import { noise } from '@/utils/noise'

interface AuroraBandConfig {
  color: string
  yBase: number
  amplitude: number
  speed: number
  thickness: number
}

class AuroraBand {
  private color: string
  private yBase: number
  private amplitude: number
  private speed: number
  private thickness: number
  private points: { x: number; y: number }[] = []

  constructor(config: AuroraBandConfig) {
    this.color = config.color
    this.yBase = config.yBase
    this.amplitude = config.amplitude
    this.speed = config.speed
    this.thickness = config.thickness
  }

  update(
    t: number,
    width: number,
    _height: number,
    mouseX: number | null,
    mouseY: number | null
  ) {
    this.points = []
    const segments = 30

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width
      let baseY = this.yBase + noise(x, this.yBase, t * this.speed) * this.amplitude

      if (mouseX !== null && mouseY !== null) {
        const dx = x - mouseX
        const dist = Math.abs(dx)
        const influence = Math.max(0, 1 - dist / 400)
        const pull = (this.yBase - mouseY) * 0.2
        baseY += pull * influence
      }

      this.points.push({ x, y: baseY })
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

    ctx.lineWidth = this.thickness
    ctx.strokeStyle = this.color
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }
}

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

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

    window.addEventListener('mousemove', handleMouseMove)

    const bands = [
      new AuroraBand({
        color: 'rgba(138, 43, 226, 0.15)',
        yBase: height * 0.4,
        amplitude: 150,
        speed: 0.5,
        thickness: 300,
      }),
      new AuroraBand({
        color: 'rgba(0, 191, 255, 0.1)',
        yBase: height * 0.6,
        amplitude: 180,
        speed: 0.7,
        thickness: 250,
      }),
      new AuroraBand({
        color: 'rgba(255, 20, 147, 0.08)',
        yBase: height * 0.5,
        amplitude: 200,
        speed: 0.3,
        thickness: 200,
      }),
    ]

    const animate = (timestamp: number) => {
      const t = timestamp * 0.001

      ctx.fillStyle = 'rgba(5, 5, 7, 0.1)'
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'lighter'
      ctx.filter = 'blur(60px)'

      bands.forEach((band) => {
        band.update(t, width, height, mouseRef.current.x, mouseRef.current.y)
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
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-[1] h-screen w-screen pointer-events-none"
      aria-hidden
    />
  )
}
