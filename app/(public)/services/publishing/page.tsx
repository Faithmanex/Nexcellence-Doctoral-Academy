import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, BookOpen, PenTool, LayoutTemplate, ArrowRight } from "lucide-react"

export default function PublishingSupport() {
  const academicServices = [
    {
      title: "Proposal Editing",
      price: "$1,100",
      desc: "Strategic editing for Chapters 1-3 to ensure scholarly rigour and committee alignment."
    },
    {
      title: "Full Dissertation Editing",
      price: "Quote Needed",
      desc: "Complete editorial review: argument flow, academic conventions, and formatting."
    }
  ]

  const curriculumServices = [
    {
      title: "Custom Course Design",
      price: "$1,200",
      desc: "Full course creation: syllabus, modules, learning outcomes, and assessments."
    },
    {
      title: "Program Design",
      price: "$4,500",
      desc: "Multi-course curriculum development from concept to delivery."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image 
          src="/images/hero.png" 
          alt="Publishing" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Editorial & Instruction</h4>
            </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif uppercase tracking-tight">Research & Publishing</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 container max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Subsection: Editing */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <PenTool className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-bold text-primary font-serif uppercase tracking-tight underline decoration-secondary decoration-4 underline-offset-8">Academic Editing</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Deep structural editing, journal targeting, and manuscript peer-review preparation for high-stakes academic writing.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {academicServices.map(s => (
                  <div key={s.title} className="p-8 border bg-card flex flex-col hover:border-secondary transition-colors group">
                    <h3 className="text-xl font-extrabold text-primary mb-2 font-sans uppercase tracking-widest">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1 italic">"{s.desc}"</p>
                    <div className="flex items-center justify-between border-t pt-4">
                       <span className="font-bold text-primary">{s.price}</span>
                       <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors flex items-center">
                         Enquire <ArrowRight className="w-3 h-3 ml-1" />
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsection: Curriculum */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <LayoutTemplate className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl font-bold text-primary font-serif uppercase tracking-tight underline decoration-secondary decoration-4 underline-offset-8">Curriculum Design</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Build courses that actually teach. From single syllabi to full degree programs, we map expertise to accreditation.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {curriculumServices.map(s => (
                  <div key={s.title} className="p-8 border bg-card flex flex-col hover:border-secondary transition-colors group">
                    <h3 className="text-xl font-extrabold text-primary mb-2 font-sans uppercase tracking-widest">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1 italic">"{s.desc}"</p>
                    <div className="flex items-center justify-between border-t pt-4">
                       <span className="font-bold text-primary">{s.price}</span>
                       <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors flex items-center">
                         Enquire <ArrowRight className="w-3 h-3 ml-1" />
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-[#192f59] p-10 text-white">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Get Started</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-8 font-light">
                Every manuscript and curriculum project is unique. Let's discuss your timeline and specific requirements.
              </p>
              <Link href="/apply">
                <Button className="w-full bg-secondary text-primary font-bold uppercase tracking-widest rounded-none h-14 border-b-4 border-[#c2820a]">
                  Enquire Today
                </Button>
              </Link>
            </div>

            <div className="bg-muted p-10 border">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 text-primary">Specialized Support</h3>
              <ul className="space-y-4">
                {[
                  "Theoretical Alignment",
                  "Committee Expectations",
                  "Pedagogical Best Practices",
                  "Accreditation Mapping"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
