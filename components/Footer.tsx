import Link from 'next/link'
import { Medal, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 text-slate-400 mt-auto border-t-8 border-secondary/30">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About */}
          <div className="space-y-6 pr-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-secondary p-2 rounded flex items-center justify-center">
                <Medal className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-2xl font-serif font-extrabold tracking-tight text-white uppercase">Nexcellence</h4>
            </div>
            <p className="text-sm leading-loose">
              An elite academic consulting firm dedicated to advancing scholars into faculty, research, and leadership excellence through rigorous methodology and strategic positioning.
            </p>
          </div>
          
          {/* Column 2: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-secondary mr-3"></span> Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Global Headquarters<br/>Virtual Academic Campus</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>operations@nexcellence.edu</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-secondary mr-3"></span> Useful Links
            </h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
              <li><Link href="/services/doctoral" className="hover:text-secondary transition-all flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Doctoral Academy</Link></li>
              <li><Link href="/services/faculty" className="hover:text-secondary transition-all flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Faculty Advancement</Link></li>
              <li><Link href="/services/leadership" className="hover:text-secondary transition-all flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Academic Leadership</Link></li>
              <li><Link href="/services/publishing" className="hover:text-secondary transition-all flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Publishing Support</Link></li>
              <li><Link href="/elite" className="text-secondary hover:text-white transition-all flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Elite Program</Link></li>
            </ul>
          </div>

          {/* Column 4: Academics */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-6 flex items-center">
              <span className="w-8 h-[2px] bg-secondary mr-3"></span> Academics
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/resources/quiz" className="hover:text-secondary transition-colors inline-flex items-center gap-2"><span className="text-secondary text-lg leading-none">›</span> Readiness Quiz</Link></li>
              <li><Link href="/resources/generator" className="hover:text-secondary transition-colors inline-flex items-center gap-2"><span className="text-secondary text-lg leading-none">›</span> Topic Generator</Link></li>
              <li><Link href="/upload" className="hover:text-secondary transition-colors inline-flex items-center gap-2"><span className="text-secondary text-lg leading-none">›</span> Secure Upload</Link></li>
              <li><Link href="/privacy" className="hover:text-secondary transition-colors inline-flex items-center gap-2"><span className="text-secondary text-lg leading-none">›</span> Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition-colors inline-flex items-center gap-2"><span className="text-secondary text-lg leading-none">›</span> Terms of Service</Link></li>
            </ul>
          </div>

        </div>
        
        {/* Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light tracking-wide text-gray-400">
          <p>COPYRIGHT {new Date().getFullYear()} NEXCELLENCE ACADEMY, ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
