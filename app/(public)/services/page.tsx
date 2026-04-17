import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Search, GraduationCap, Globe, LayoutTemplate, PenTool, BookOpen, ArrowRight, Trophy } from "lucide-react"

export default function ServicesHub() {
  const serviceHubs = [
    {
      title: "Doctoral Academy",
      desc: "Complete your dissertation with structured coaching, editing, and research support.",
      icon: Search,
      href: "/services/doctoral"
    },
    {
      title: "Faculty Advancement",
      desc: "Strategic identity, publication pipelines, and tenure positioning for early and mid-career faculty.",
      icon: GraduationCap,
      href: "/services/faculty"
    },
    {
      title: "Academic Leadership & Coaching",
      desc: "Executive coaching and strategic consulting for administrators and institutional leaders.",
      icon: Globe,
      href: "/services/leadership"
    },
    {
      title: "Research & Publishing",
      desc: "Editorial services for manuscripts and journal submissions for scholars seeking impact.",
      icon: BookOpen,
      href: "/services/publishing"
    },
    {
      title: "Curriculum & Innovation",
      desc: "Custom course and program design services for institutions and individual experts.",
      icon: LayoutTemplate,
      href: "/services/publishing"
    },
    {
      title: "Elite Transformation",
      desc: "Our flagship 6-month comprehensive engagement for total academic and career transformation.",
      icon: Trophy,
      href: "/elite"
    },
    {
      title: "Pricing & Enrollment",
      desc: "Complete service catalogue with transparent pricing and secure enrollment options.",
      icon: PenTool,
      href: "/pricing"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/hero.png" 
          alt="Services Hub" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Strategic Scaffolding</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Our Academic Services</h1>
        </div>
      </section>

      {/* Grid of Service Areas */}
      <section className="py-24 container max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
           <h2 className="text-2xl font-bold text-primary font-serif italic">Where Are You in Your Academic Journey?</h2>
           <p className="text-muted-foreground leading-relaxed">
             Select the pathway that matches your current stage. From dissertation to leadership, Nexcellence Academy™ provides the expert support required to advance.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceHubs.map(h => (
            <Link key={h.title} href={h.href} className="bg-white elevated-card p-10 flex flex-col items-center text-center group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <h.icon className="w-24 h-24" />
               </div>
               <h.icon className="w-12 h-12 text-secondary mb-8 group-hover:scale-110 transition-transform" />
               <h3 className="text-lg font-extrabold text-primary mb-4 font-sans uppercase tracking-widest line-clamp-1">{h.title}</h3>
               <p className="text-xs text-slate-500 leading-relaxed mb-8 flex-1">{h.desc}</p>
               <div className="text-xs font-bold uppercase tracking-widest text-primary hover:text-secondary inline-flex items-center gap-2 transition-all">
                 Explore Pathway <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pre-footer Callout */}
      <section className="bg-muted py-24 text-center">
         <div className="container max-w-3xl">
           <h2 className="text-3xl font-bold text-primary font-serif mb-6">Need a Customized Strategy?</h2>
           <p className="text-lg text-muted-foreground mb-10">Sometimes the path isn't a single box. We offer bespoke consulting for complex institutional and individual cases.</p>
           <Link href="/contact">
             <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest px-10 h-14 rounded-none">
               Speak With An Advisor
             </Button>
           </Link>
         </div>
      </section>
    </div>
  )
}
