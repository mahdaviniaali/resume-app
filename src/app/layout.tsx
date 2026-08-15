import type { Metadata } from 'next'
import { Inter, Playfair_Display, Vazirmatn, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'GENESIS // Aurora Flow',
  description: 'From the void of is empty; We code the light.',
  keywords: ['SaaS', 'DDD', 'Rust', 'Python', 'Architecture', 'Genesis'],
  metadataBase: new URL('https://mahdavinia.ir'),
  openGraph: {
    title: 'GENESIS // Aurora Flow',
    description: 'From the void of is empty; We code the light.',
    type: 'website',
    url: 'https://mahdavinia.ir',
    siteName: 'Genesis',
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
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${vazirmatn.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
