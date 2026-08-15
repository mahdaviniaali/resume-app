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
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        void: '#050507',
        muted: '#777777',
        border: 'rgba(255, 255, 255, 0.08)',
        glass: 'rgba(255, 255, 255, 0.02)',
      },
      animation: {
        blink: 'blink 3s infinite',
        'fade-up': 'fadeUp 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0.3' },
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
