import type { Metadata } from 'next'
import {
  Inter,
  Orbitron,
  JetBrains_Mono,
  Source_Code_Pro,
  Vazirmatn,
  Montserrat,
  Playfair_Display,
} from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['500', '700', '800', '900'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '600', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
})

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code',
  weight: ['300', '400', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazirmatn',
})

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
    <html
      lang="fa"
      dir="rtl"
      className={`${inter.variable} ${orbitron.variable} ${montserrat.variable} ${jetbrains.variable} ${sourceCode.variable} ${playfair.variable} ${vazirmatn.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
