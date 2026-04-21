import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Award, BookOpen, Target, Users, ArrowRight, FileText, Microscope } from "lucide-react"

export default function FacultyAdvancement() {
  const services = [
    { 
      title: "Academic Identity & Scholarly Positioning™", 
      price: "$1,000",
      desc: "Define your scholarly identity, clarify your research focus, and position yourself for elite opportunities.",
      icon: Target
    },
    { 
      title: "Research & Publication Strategy", 
      price: "$1,200",
      desc: "Build a sustainable publishing pipeline and identify high-impact target journals.",
      icon: BookOpen 
    },
    { 
      title: "Tenure & Promotion Strategy", 
      price: "$1,500",
      desc: "Build a winning tenure portfolio and position your record for a successful review.",
      icon: Award
    },
    { 
      title: "Faculty Success Package", 
      price: "$1,200",
      desc: "MQL-level application bundle: CV, cover letter, research statement, and teaching philosophy.",
      icon: Users
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Faculty Advancement" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#192f59]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Research & Development</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Faculty Advancement</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif leading-tight">
              You’ve Earned Your Degree. <br/> Now Build Your Legacy.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Strategic support for faculty who want to publish more, advance faster, and position themselves as leaders in their field. From scholarly identity to tenure — we’ve got you.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              {services.map(plan => (
                <div key={plan.title} className="bg-white elevated-card p-10 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-primary mb-4 font-sans uppercase tracking-widest">{plan.title}</h3>
                  <p className="text-xs text-slate-500 mb-8 leading-relaxed font-light">{plan.desc}</p>
                  <p className="font-bold text-2xl text-primary mb-6">{plan.price}</p>
                  <Link href="/apply">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-12">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-primary p-10 text-white elevated-card">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Need Help?</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-8">Not sure which pathway is right for your faculty career stage? Schedule a strategy session today.</p>
              <Link href="/apply">
                <Button className="w-full bg-secondary text-primary font-bold uppercase tracking-widest rounded-none py-6 border-b-4 border-[#c2820a]">
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="bg-slate-900 elevated-card p-10 text-white border-t-8 border-t-secondary">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-white/40">Our Expertise</h3>
              <div className="space-y-5">
                {[
                  { label: "Manuscript Strategy", icon: FileText },
                  { label: "Tenure Portfolio Audit", icon: Award },
                  { label: "Grant Writing Support", icon: Microscope },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
