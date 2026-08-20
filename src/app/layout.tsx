import type { Metadata } from 'next'

/* Self-hosted via npm — no Google Fonts / CDN (works in Iran without VPN) */
import '@fontsource/vazirmatn/300.css'
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/500.css'
import '@fontsource/vazirmatn/600.css'
import '@fontsource/vazirmatn/700.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/orbitron/500.css'
import '@fontsource/orbitron/700.css'
import '@fontsource/orbitron/800.css'
import '@fontsource/orbitron/900.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/800.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'
import '@fontsource/source-code-pro/300.css'
import '@fontsource/source-code-pro/400.css'
import '@fontsource/source-code-pro/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/400-italic.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/playfair-display/900-italic.css'

import './globals.css'

export const metadata: Metadata = {
  title: 'ISEMPTY // Systems. Architecture. Engineering.',
  description:
    'From the void of is empty; we code the light. Systems architecture, DDD, and high-performance backends.',
  keywords: ['ISEMPTY', 'جنسیس', 'SaaS', 'DDD', 'Rust', 'Python', 'معماری سیستم', 'تیم'],
  metadataBase: new URL('https://isempty.online'),
  openGraph: {
    title: 'ISEMPTY // Systems. Architecture. Engineering.',
    description: 'From the void of is empty; we code the light.',
    type: 'website',
    url: 'https://isempty.online',
    siteName: 'ISEMPTY',
    locale: 'fa_IR',
  },
  icons: {
    icon: [{ url: '/logo.png', sizes: 'any' }],
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
