'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/BookSessionButton"
import { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  price: string
  desc: string
  icon: LucideIcon
  type: "coaching" | "consultation"
  href?: string
}

export function ServiceCard({ title, price, desc, icon: Icon, type, href }: ServiceCardProps) {
  return (
    <div className="bg-[#D6E4F0]/20 border border-[#D6E4F0] p-10 group hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 bg-[#D6E4F0]/40 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1B2A4A] transition-colors">
        <Icon className="w-6 h-6 text-[#1B2A4A] group-hover:text-[#D6E4F0] transition-colors" />
      </div>
      <h3 className="text-lg font-extrabold text-[#1B2A4A] mb-4 font-sans uppercase tracking-widest">{title}</h3>
      <p className="text-xs text-slate-500 mb-8 leading-relaxed font-light">{desc}</p>
      <p className="font-bold text-2xl text-[#1B2A4A] mb-6">{price}</p>
      {type === "consultation" ? (
        <BookSessionButton
          variant="outline"
          className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-12"
        >
          Book Now
        </BookSessionButton>
      ) : (
        <Link href={href || `/apply?program=${encodeURIComponent(title)}`}>
          <Button variant="outline" className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-12">
            {href ? "Learn More" : "Get Started"}
          </Button>
        </Link>
      )}
    </div>
  )
}
