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
    <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-t-8 border-t-secondary p-10 group hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-extrabold text-primary mb-4 font-sans uppercase tracking-widest flex-none">{title}</h3>
      <p className="text-sm text-slate-500 mb-8 leading-relaxed font-light flex-grow">{desc}</p>
      <p className="font-bold text-2xl text-primary mb-6 flex-none">{price}</p>
      <div className="flex-none mt-auto">
        {type === "consultation" ? (
          <BookSessionButton
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] rounded-none h-12 transition-colors duration-300 flex items-center justify-center"
          >
            Book Now
          </BookSessionButton>
        ) : (
          <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-black uppercase tracking-widest text-[10px] rounded-none h-12 transition-colors duration-300 flex items-center justify-center">
            <Link href={href || `/apply?program=${encodeURIComponent(title)}`}>
              {href ? "Learn More" : "Get Started"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
