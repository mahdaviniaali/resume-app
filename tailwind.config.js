/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-orbitron)', 'var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'var(--font-montserrat)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        quote: ['var(--font-source-code)', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: '#050505',
        ink: '#0A0A0A',
        gold: '#D4AF37',
        'gold-bright': '#F5B342',
        muted: '#8A8A8A',
        dim: '#707070',
        line: '#2A2A2A',
        grid: '#1A1A1A',
        border: '#2A2A2A',
        glass: 'rgba(255, 255, 255, 0.025)',
      },
      letterSpacing: {
        hero: '0.18em',
        wide: '0.1em',
        en: '0.05em',
      },
      lineHeight: {
        roomy: '2',
      },
      animation: {
        blink: 'blink 3s infinite',
        caret: 'caret 1.1s step-end infinite',
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0.3' },
        },
        caret: {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
