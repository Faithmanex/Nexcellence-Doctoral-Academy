import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Award, GraduationCap, Mail, ArrowRight, UserCheck } from "lucide-react"

export default function AboutPage() {
  const expertise = [
    "Doctoral dissertation coaching",
    "Faculty positioning & tenure preparation",
    "Research methodology development",
    "Publication & journal strategy",
    "Curriculum & academic program design",
    "Leadership coaching & consulting"
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/hero.png" 
          alt="Dr. William Triplett" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm">Founder & Strategist</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Meet Dr. William Triplett</h1>
        </div>
      </section>

      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Bio */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif leading-tight italic">
              Empowering the Next Generation <br /> of Academic Leaders.
            </h2>
            
            <div className="prose prose-slate max-w-none text-base text-muted-foreground leading-relaxed space-y-6">
              <p>
                Dr. William Triplett is a scholar, faculty member, and academic strategist with more than fifteen years of experience supporting doctoral scholars, faculty, and academic leaders across disciplines.
              </p>
              <p>
                As the founder of Nexcellence Academy™, Dr. Triplett has worked with hundreds of doctoral candidates — helping them move from stalled to defended, from overwhelmed to confident, and from ABD to Dr. His approach combines rigorous academic expertise with practical, structured support that produces results.
              </p>
              <p>
                Before founding Nexcellence, Dr. Triplett built his career in higher education as both a practitioner and a scholar. He understands the real pressures of doctoral study and faculty life because he has lived them — the late nights with data, the committee politics, the publication pressure, and the quiet satisfaction of watching a student cross the stage.
              </p>
              
              <div className="bg-muted p-8 border-l-4 border-secondary my-8">
                <h3 className="text-xl font-bold text-primary font-serif mb-4 uppercase tracking-tight">What Drives the Work</h3>
                <p className="italic leading-relaxed">
                  "Dr. Triplett founded Nexcellence Academy™ on a simple belief: that every serious scholar deserves expert support — not just the ones at well-resourced institutions or with well-connected advisors. Too many doctoral students and early-career faculty are left to figure things out alone. Nexcellence exists to change that."
                </p>
              </div>

              <p>
                The work is personal. Dr. Triplett takes on a limited number of clients each cohort to ensure every engagement receives the depth of attention it deserves. His clients describe him as direct, knowledgeable, and genuinely invested in their success.
              </p>
            </div>

            {/* Expertise Grid */}
            <div className="pt-12">
               <h3 className="text-lg md:text-xl font-bold text-primary font-serif mb-6 uppercase tracking-tight">Our Areas of Expertise</h3>
                <div className="grid md:grid-cols-2 gap-4">
                   {expertise.map(item => (
                     <div key={item} className="elevated-card p-5 group flex items-center gap-4 bg-white/50 border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                        <span className="text-[10px] font-extrabold text-primary/80 uppercase tracking-widest leading-tight font-sans">{item}</span>
                     </div>
                   ))}
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-slate-900 elevated-card p-10 text-white rounded-none border-t-8 border-t-secondary">
               <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Academic Credentials</h3>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                    <GraduationCap className="w-5 h-5 text-secondary shrink-0" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Advanced Degrees</p>
                       <p className="text-sm opacity-90 leading-relaxed italic">Ph.D. in Academic Leadership & Strategic Excellence</p>
                    </div>
                 </li>
                 <li className="flex gap-4">
                    <Award className="w-5 h-5 text-secondary shrink-0" />
                    <div>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Current Appointment</p>
                       <p className="text-sm opacity-90 leading-relaxed">Senior Faculty & Strategic Advisor</p>
                    </div>
                 </li>
               </ul>
            </div>

            <div className="bg-muted p-10 border border-muted-foreground/10 text-center">
              <h3 className="text-lg font-bold text-primary font-serif mb-6 italic">Ready to Work Together?</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Dr. Triplett personally leads every engagement at Nexcellence Academy™. If you’re ready to build your academic legacy — start here.
              </p>
              <Link href="/contact">
                <Button className="w-full h-14 bg-primary text-white hover:bg-secondary hover:text-primary font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20">
                  Book A Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
