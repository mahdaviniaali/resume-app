export function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          'linear-gradient(180deg, transparent 0%, transparent 70%, rgba(5,5,5,0.45) 100%)',
      }}
      aria-hidden
    />
  )
}
