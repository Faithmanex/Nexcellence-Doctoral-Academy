import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Users, LayoutTemplate, Globe, CheckCircle2, ArrowRight, MessageSquare } from "lucide-react"

export default function WorkshopsPage() {
  const workshops = [
    {
      title: "Faculty Development",
      desc: "Full-day or multi-session tracks covering scholarly publishing, CV positioning, tenure preparation, and academic leadership.",
      investment: "Starting from $2,500",
      icon: Users
    },
    {
      title: "Curriculum Design",
      desc: "Hands-on training for faculty and administrators. Covers learning outcomes, course architecture, and assessment design.",
      investment: "Starting from $3,000",
      icon: LayoutTemplate
    },
    {
      title: "Institutional Strategy",
      desc: "Consulting for graduate programs and professional organizations to improve student completion and faculty impact.",
      investment: "Custom Quote",
      icon: Globe
    }
  ]

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:h-[40vh] flex items-center overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Institutional Services" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/85" />
        <div className="container relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-0">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm">Empowering Your Team</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight mb-4 leading-tight">
            Bring Nexcellence <br /> to Your Institution.
          </h1>
          <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl opacity-90">
            Custom workshops and strategic partnerships for universities, colleges, and professional organizations committed to excellence.
          </p>
        </div>
      </section>

      {/* Workshop Grid */}
      <section className="py-12 container max-w-7xl px-6">
         <div className="grid md:grid-cols-3 gap-8">
            {workshops.map((w) => (
              <div key={w.title} className="elevated-card p-12 flex flex-col items-center text-center group relative overflow-hidden bg-white">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <w.icon className="w-24 h-24" />
                 </div>
                 <w.icon className="w-12 h-12 text-secondary mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg md:text-xl font-extrabold text-primary uppercase tracking-widest mb-4 font-sans">{w.title}</h3>
                 <p className="text-xs text-slate-500 leading-relaxed mb-8 flex-1 font-light">{w.desc}</p>
                 <div className="w-full pt-8 border-t border-slate-100 mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-6 italic">{w.investment}</p>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest h-12 rounded-none text-[10px] border-b-4 border-black/10">
                         Request Proposal
                      </Button>
                    </Link>
                 </div>
              </div>
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
