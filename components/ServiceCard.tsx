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
    <div className="bg-white elevated-card border-t-8 border-secondary p-8 md:p-10 group flex flex-col h-full">
      <div className="w-12 h-12 bg-slate-50 rounded-md flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-extrabold text-primary mb-4 font-sans uppercase tracking-widest flex-none">{title}</h3>
      <p className="text-sm text-slate-500 mb-8 leading-relaxed font-light flex-grow">{desc}</p>
      <p className="font-bold text-2xl text-primary mb-6 flex-none">{price}</p>
      <div className="flex-none mt-auto">
        {type === "consultation" ? (
          <BookSessionButton
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-12 transition-colors duration-300"
          >
            Book Now
          </BookSessionButton>
        ) : (
          <Link href={href || `/apply?program=${encodeURIComponent(title)}`} className="block w-full">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-12 transition-colors duration-300">
              {href ? "Learn More" : "Get Started"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
