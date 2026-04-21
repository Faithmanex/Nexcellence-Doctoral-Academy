'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Medal, Phone, Mail, Search, Menu, X } from 'lucide-react'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isSearchOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen, isMobileMenuOpen])

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
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm shadow-slate-200/50 relative">
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
              <Link key={link.label} href={link.href} className="text-[13px] font-bold text-primary hover:text-secondary uppercase tracking-wider transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l">
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  title="Search"
                  aria-label="Open search input"
                  aria-expanded={isSearchOpen}
                  className="flex items-center justify-center focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded"
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
          <div className="lg:hidden p-4 bg-white border-b absolute w-full z-40 animate-in slide-in-from-top" role="dialog" aria-label="Search">
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

        {/* Custom Mobile Menu Dropdown */}
        <div ref={mobileMenuRef} className={`absolute right-0 top-full z-[100] w-72 bg-slate-900 shadow-2xl flex flex-col border-t border-white/10 transition-all duration-200 origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="text-white font-serif uppercase tracking-widest text-base font-bold">Navigation</span>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={() => setIsMobileMenuOpen(false)} title="Close Menu" aria-label="Close navigation menu">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-1 p-2 max-h-[70vh] overflow-y-auto">
              {navLinks.map(link => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-white hover:text-secondary px-3 py-2 transition-colors rounded"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="opacity-10 my-2" />
              {topLinks.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white/70 px-3 py-2">{link.label}</Link>
              ))}
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white/70 px-3 py-2">Dashboard</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-white/70 px-3 py-2">Contact</Link>
              <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
                <Button className="w-full font-bold uppercase text-sm bg-secondary text-primary rounded h-12 border-b-2 border-[#c2820a]">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
      </header>
    </div>
  )
}
