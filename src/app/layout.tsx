import type { Metadata } from 'next';
import {
  Montserrat,
  Playfair_Display,
  Vazirmatn,
} from 'next/font/google';
import './globals.css';
import { getProfileData } from '@/lib/profile';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-vazirmatn',
});

const profile = getProfileData();
const landing = profile.landing;

export const metadata: Metadata = {
  title: `${landing.name} | Portfolio & Resume`,
  description:
    `${landing.name} — ${landing.tagline}. Backend Developer & System Architect specializing in Django/Python. Portfolio and bilingual resume.`,
  metadataBase: new URL('https://mahdavinia.ir'),
  keywords: [
    'Ali Mahdavinia',
    'Backend Developer',
    'Django',
    'Python',
    'System Architecture',
    'Portfolio',
    'Resume',
    'Software Engineer',
  ],
  authors: [{ name: landing.name }],
  creator: landing.name,
  openGraph: {
    title: `${landing.name} | Portfolio & Resume`,
    description: `${landing.tagline} — Backend Developer & System Architect. Explore portfolio and bilingual resume.`,
    type: 'website',
    url: 'https://mahdavinia.ir',
    siteName: `${landing.name} Portfolio`,
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: `${landing.name} logo`,
      },
    ],
    locale: 'fa_IR',
    alternateLocale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${landing.name} | Portfolio & Resume`,
    description: `${landing.tagline} — Backend Developer & System Architect`,
    images: ['/logo.png'],
    creator: '@mahdaviniaali',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" data-theme="dark">
      <body
        className={`${montserrat.variable} ${playfair.variable} ${vazirmatn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
