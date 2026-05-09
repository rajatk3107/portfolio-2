import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Syne,
  DM_Sans,
  Space_Mono,
} from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rajat K. — Full-Stack Developer',
  description:
    'Full-stack developer crafting precision digital experiences. Specialising in React, Next.js, and immersive web interactions.',
  keywords: ['developer', 'full-stack', 'portfolio', 'React', 'Next.js', 'three.js'],
  openGraph: {
    title: 'Rajat K. — Full-Stack Developer',
    description: 'Crafting precision digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${cormorant.variable}
          ${syne.variable}
          ${dmSans.variable}
          ${spaceMono.variable}
          bg-[var(--bg)] text-[var(--text)] antialiased
        `}
      >
        {/* Runs before React hydration — prevents flash of wrong theme */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
