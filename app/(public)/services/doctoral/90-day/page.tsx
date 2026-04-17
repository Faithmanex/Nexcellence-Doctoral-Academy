import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Clock, Calendar, Users, ShieldCheck, ArrowRight } from "lucide-react"

export default function Dissertation90Day() {
  const roadmap = [
    { 
      month: "Month 1", 
      title: "Foundations", 
      desc: "Clarify research question, align with committee, establish writing schedule, and strengthen literature review." 
    },
    { 
      month: "Month 2", 
      title: "Execution", 
      desc: "Write and refine methodology and findings chapters. Weekly feedback loops prevent stalling." 
    },
    { 
      month: "Month 3", 
      title: "Completion", 
      desc: "Final chapters, full draft review, defense preparation, and submission readiness." 
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <Image 
          src="/images/doctoral.png" 
          alt="90 Day Dissertation" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/85" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 bg-secondary text-primary font-bold uppercase tracking-widest text-xs mb-6">High-Touch Coaching</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif uppercase tracking-tight mb-6">Finish Your Dissertation <br /> in 90 Days.</h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            A structured, high-touch coaching program designed to take doctoral scholars from stuck to defended in 12 weeks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="https://buy.stripe.com/90-day-dissertation-full" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-8 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a]">
                Enroll Now — $3,997
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent">
                Payment Plan Options
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-24 container max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-primary font-serif uppercase tracking-tight mb-8 border-l-4 border-secondary pl-6">Is This Program Right for You?</h2>
              <ul className="grid md:grid-cols-2 gap-6">
                {[
                  "You’ve been ABD longer than you planned.",
                  "You have a topic but can’t make progress.",
                  "You feel isolated and overwhelmed.",
                  "You want to defend within 6 months."
                ].map(item => (
                  <li key={item} className="flex gap-3 text-muted-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
               <h2 className="text-3xl font-bold text-primary font-serif uppercase tracking-tight mb-10 border-l-4 border-secondary pl-6">Your 90-Day Roadmap</h2>
               <div className="space-y-8">
                  {roadmap.map((step, i) => (
                    <div key={step.month} className="flex gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center font-serif font-bold text-primary group-hover:bg-secondary transition-colors italic">
                          {i + 1}
                        </div>
                        {i < 2 && <div className="w-[2px] h-full bg-muted mt-2" />}
                      </div>
                      <div className="pb-8">
                        <h3 className="text-xl font-extrabold text-primary uppercase tracking-widest mb-2 font-sans">{step.month}: {step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="space-y-8">
             <div className="bg-[#192f59] p-10 text-white rounded shadow-xl">
                <ShieldCheck className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">What's Included</h3>
                <ul className="space-y-4 text-sm opacity-90">
                  <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Weekly 1:1 Coaching</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Writing Accountability</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Methodology Support</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Defense Prep Phase</li>
                  <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-secondary shrink-0" /> Direct Messaging Access</li>
                </ul>
             </div>

             <div className="bg-muted p-10 border border-t-8 border-t-secondary">
                <h3 className="text-xl font-bold uppercase tracking-widest text-primary mb-4">Pricing Plans</h3>
                <p className="text-2xl font-bold text-primary mb-6">$3,997 <span className="text-sm font-normal text-muted-foreground uppercase tracking-widest">Full Investment</span></p>
                <div className="space-y-4 mb-8">
                   <div className="p-4 bg-white border border-secondary/20 rounded">
                      <p className="font-bold text-xs uppercase tracking-widest text-secondary mb-1">Standard Plan</p>
                      <p className="text-sm font-medium">$1,497 deposit + $1,250 x 2 months</p>
                   </div>
                </div>
                <Link href="/contact">
                   <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest h-12 rounded-none">
                     Inquire About Plans
                   </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
