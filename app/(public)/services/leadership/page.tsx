import { ServiceCard } from "@/components/ServiceCard"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Zap, Briefcase } from "lucide-react"

export default function LeadershipCoaching() {
  const offerings = [
    { 
      title: "Academic Leadership Intensive", 
      price: "$2,500",
      desc: "Structured engagement for leaders navigating institutional change or strategic planning.",
      icon: ShieldCheck,
      type: "coaching" as const
    },
    { 
      title: "1:1 Academic Strategy Session", 
      price: "$250",
      desc: "60-minute high-level advisory session for leaders who need an external perspective.",
      icon: Zap,
      type: "coaching" as const
    },
    { 
      title: "Monthly Leadership Advisory", 
      price: "$1,200/mo",
      desc: "Ongoing monthly engagement for consistent strategic support and trusted advisory.",
      icon: Briefcase,
      type: "coaching" as const
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative min-h-[35vh] flex items-end overflow-hidden">
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
              <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] font-sans">Executive Services</h4>
            </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-serif uppercase tracking-tight text-balance">Academic Leadership & Coaching</h1>
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
            
            <div className="grid md:grid-cols-2 gap-6 pt-6 items-stretch">
              {offerings.map(item => (
                <ServiceCard
                  key={item.title}
                  title={item.title}
                  price={item.price}
                  desc={item.desc}
                  icon={item.icon}
                  type={item.type}
                />
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
