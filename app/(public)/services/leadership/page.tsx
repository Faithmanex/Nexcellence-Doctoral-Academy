import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Zap, Briefcase, Globe, ArrowRight } from "lucide-react"

export default function LeadershipCoaching() {
  const offerings = [
    { 
      title: "Academic Leadership Intensive", 
      price: "$2,500",
      desc: "Structured engagement for leaders navigating institutional change or strategic planning.",
      icon: ShieldCheck
    },
    { 
      title: "1:1 Academic Strategy Session", 
      price: "$250",
      desc: "60-minute high-level advisory session for leaders who need an external perspective.",
      icon: Zap
    },
    { 
      title: "Monthly Leadership Advisory", 
      price: "$1,200/mo",
      desc: "Ongoing monthly engagement for consistent strategic support and trusted advisory.",
      icon: Briefcase
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Academic Leadership" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#192f59]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Executive Services</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight text-balance">Academic Leadership & Coaching</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif leading-tight">
              Lead with Clarity. <br/> Build with Purpose.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Executive coaching and strategic consulting for academic administrators, department chairs, deans, and faculty leaders who want to build high-performing, mission-aligned academic environments.
            </p>
            
            <div className="space-y-6 pt-6">
              {offerings.map(item => (
                <div key={item.title} className="elevated-card p-10 flex flex-col md:flex-row gap-8 group items-center bg-white">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-secondary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-extrabold text-primary mb-2 font-sans uppercase tracking-widest">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                  <div className="text-center md:text-right shrink-0 bg-slate-50 p-6 rounded-2xl group-hover:bg-secondary/5 transition-colors">
                    <p className="font-bold text-2xl text-primary mb-4">{item.price}</p>
                    <Link href="/apply">
                      <Button className="bg-primary text-white font-bold uppercase tracking-widest text-[10px] rounded-none px-8 h-12 hover:bg-secondary hover:text-primary transition-all border-b-4 border-black/20">
                        Enquire
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary p-10 text-primary">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-primary/10 pb-4">Our Mission</h3>
              <p className="text-sm font-medium leading-relaxed italic opacity-80">"Empowering the next generation of academic leaders through strategic scaffolding and rigorous methodology."</p>
            </div>

            <div className="bg-slate-900 elevated-card p-10 text-white rounded-none border-t-8 border-t-secondary">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-white/40">Strategic Focus</h3>
              <ul className="space-y-5">
                {[
                  "Institutional Change Mgmt",
                  "Strategic Program Planning",
                  "Faculty Team Development",
                  "Accreditation Alignment"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{item}</span>
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
