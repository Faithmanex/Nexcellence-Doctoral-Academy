import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Users, LayoutTemplate, Globe, MessageSquare } from "lucide-react"

export default function WorkshopsPage() {
  const workshops = [
    {
      title: "Faculty Development",
      desc: "Full-day or multi-session tracks covering scholarly publishing, CV positioning, tenure preparation, and academic leadership.",
      price: "Starting from $2,500",
      icon: Users,
      type: "consultation" as const
    },
    {
      title: "Curriculum Design",
      desc: "Hands-on training for faculty and administrators. Covers learning outcomes, course architecture, and assessment design.",
      price: "Starting from $3,000",
      icon: LayoutTemplate,
      type: "consultation" as const
    },
    {
      title: "Institutional Strategy",
      desc: "Consulting for graduate programs and professional organizations to improve student completion and faculty impact.",
      price: "Custom Quote",
      icon: Globe,
      type: "consultation" as const
    }
  ]

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[35vh] flex items-end overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Institutional Services" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/85" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] font-sans">Empowering Your Team</h4>
            </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-serif uppercase tracking-tight">
            Bring Nexcellence <br /> to Your Institution.
          </h1>
        </div>
      </section>

      {/* Workshop Grid */}
      <section className="py-12 container max-w-7xl px-6">
         <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {workshops.map((w) => (
              <ServiceCard
                key={w.title}
                title={w.title}
                price={w.price}
                desc={w.desc}
                icon={w.icon}
                type={w.type}
              />
            ))}
         </div>
      </section>

      {/* Inquiry CTA */}
      <section className="bg-primary py-16 text-white">
         <div className="container max-w-4xl mx-auto px-6 text-center">
            <MessageSquare className="w-16 h-16 text-secondary mx-auto mb-8 opacity-40" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Ready to Scale Excellence?</h2>
            <p className="text-lg opacity-80 mb-12 leading-relaxed">
              Tell us about your institution’s name, the number of participants, your goals, and your preferred delivery format. We’ll respond within 2 business days with a custom proposal tailored to your mission.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-16 px-12 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20 text-lg">
                GET A CUSTOM QUOTE
              </Button>
            </Link>
         </div>
      </section>

      {/* Footer pre-banner (Mini) */}
      <section className="bg-muted py-12 text-center text-[10px] uppercase tracking-[0.5em] text-muted-foreground opacity-50">
        Global Institutional Partnership Program // Nexcellence Academy™
      </section>
    </div>
  )
}
