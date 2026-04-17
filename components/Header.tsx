'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Medal, Phone, Mail, Search, Menu, X } from 'lucide-react'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { label: 'Doctoral', href: '/services/doctoral' },
    { label: 'Faculty', href: '/services/faculty' },
    { label: 'Leadership', href: '/services/leadership' },
    { label: 'Curriculum', href: '/services/curriculum' },
    { label: 'Research', href: '/services/publishing' },
    { label: 'Books', href: '/services/book' },
    { label: 'Elite', href: '/elite' },
  ]

  const topLinks = [
    { label: 'Resources', href: '/resources/quiz' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <div className="w-full">
      {/* Top Bar - Academic Hierarchy */}
      <div className="bg-slate-900 text-white/70 text-[11px] py-2.5 hidden lg:block border-b border-white/5 font-sans uppercase tracking-[0.1em]">
        <div className="container flex justify-between items-center px-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +1 (800) 123-4567</span>
            <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> operations@nexcellenceacademy.com</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              {topLinks.map(link => (
                <Link key={link.label} href={link.href} className="hover:text-white transition font-medium">{link.label}</Link>
              ))}
              <Link href="/login" className="hover:text-white transition font-medium">Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm shadow-slate-200/50">
        <div className="container flex h-20 lg:h-24 items-center justify-between px-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group shrink-0">
            <div className="bg-secondary p-1.5 md:p-2 rounded flex items-center justify-center">
              <Medal className="w-6 h-6 md:w-8 h-8 text-primary" />
            </div>
            <span className="inline-block font-serif font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight text-primary uppercase">Nexcellence</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-[13px] font-bold text-primary hover:text-secondary uppercase tracking-wider transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l">
              <div className="relative">
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  title="Search"
                  aria-label="Open search input"
                  className="flex items-center justify-center"
                >
                  <Search className="w-5 h-5 text-primary cursor-pointer hover:text-secondary" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-10 w-64 bg-white p-4 shadow-xl border rounded-md z-[60] animate-in fade-in slide-in-from-top-2">
                    <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/services/doctoral?search=${(e.target as any).query.value}` }}>
                      <input 
                        name="query"
                        type="text" 
                        placeholder="Search programs..." 
                        className="w-full p-2 text-sm border-b focus:outline-none focus:border-secondary"
                        autoFocus
                      />
                    </form>
                  </div>
                )}
              </div>
              <Link href="/apply">
                <Button className="font-bold uppercase tracking-wider bg-secondary text-primary hover:bg-secondary/90 rounded-none px-6 py-6 border-b-4 border-[#c2820a] ml-4">
                  Apply Now
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="lg:hidden flex items-center gap-4">
             <Search className="w-5 h-5 text-primary" onClick={() => setIsSearchOpen(!isSearchOpen)} />
             <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)} title="Menu" aria-label="Open navigation menu">
                <Menu className="w-6 h-6 text-primary" />
             </Button>
          </div>
        </div>
        
        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="lg:hidden p-4 bg-white border-b absolute w-full z-40 animate-in slide-in-from-top">
            <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/services/doctoral?search=${(e.target as any).query.value}` }}>
              <input 
                name="query"
                type="text" 
                placeholder="Search programs..." 
                className="w-full p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Custom Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="text-white font-serif uppercase tracking-widest text-xl font-bold">Navigation</span>
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)} title="Close Menu" aria-label="Close navigation menu">
                <X className="w-8 h-8" />
              </Button>
            </div>
            <div className="flex flex-col gap-6 p-8 overflow-y-auto">
              {navLinks.map(link => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white hover:text-secondary transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="opacity-10" />
              {topLinks.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white/70 font-medium">{link.label}</Link>
              ))}
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white/70 font-medium">Dashboard</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-white/70 font-medium">Contact</Link>
              <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)} className="mt-6">
                <Button className="w-full font-bold uppercase tracking-widest bg-secondary text-primary rounded-none h-16 text-lg border-b-4 border-[#c2820a]">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}
