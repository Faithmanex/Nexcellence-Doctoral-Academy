import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Lato, Noto_Serif } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const notoSerif = Noto_Serif({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Nexcellence Academy™',
  description: 'Strategic academic consulting for doctoral scholars, faculty, academic leaders, curriculum designers, and aspiring authors.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col selection:bg-primary/20",
        lato.variable,
        notoSerif.variable
      )}>
        <Header />
        <main className="flex-1 flex flex-col">
          <Breadcrumbs />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
