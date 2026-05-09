import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Syne,
  DM_Sans,
  Space_Mono,
} from 'next/font/google'
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${cormorant.variable}
          ${syne.variable}
          ${dmSans.variable}
          ${spaceMono.variable}
          bg-[#080808] text-[#f0ebe3] antialiased
        `}
      >
        {children}
      </body>
    </html>
  )
}
