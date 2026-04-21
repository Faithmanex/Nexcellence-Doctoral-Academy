import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Trophy, Star, ShieldCheck, Zap, Users, ArrowRight, Quote, Target, GraduationCap, Briefcase, Lightbulb } from "lucide-react"

export default function EliteProgramPage() {
  const whoItIsFor = [
    { 
      icon: GraduationCap,
      title: "Doctoral Scholars", 
      desc: "ABD scholars ready to finish, publish, and transition into faculty roles within one year." 
    },
    { 
      icon: Briefcase,
      title: "New Faculty", 
      desc: "Early-career academics navigating the first three years and building a publishable profile." 
    },
    { 
      icon: ShieldCheck,
      title: "Tenure-Track Faculty", 
      desc: "Established scholars preparing a tenure case while simultaneously building their research portfolio." 
    },
    { 
      icon: Lightbulb,
      title: "Academic Leaders", 
      desc: "Department chairs and directors taking on new institutional responsibilities with strategic clarity." 
    }
  ]

  const testimonials = [
    {
      quote: "The Elite Program is the reason I'm now a published author, a tenured faculty member, and a keynote speaker — all within eighteen months of completing it. Dr. Triplett doesn't just advise. He transforms.",
      name: "Dr. Constance Adaeze",
      credentials: "Elite Program Graduate, Year 1"
    },
    {
      quote: "I enrolled in the Elite Program at the lowest point of my academic career. Six months later I had defended my dissertation, submitted my first journal article, and accepted a faculty position. This program works.",
      name: "Dr. Michael Tanner",
      credentials: "Elite Program Graduate"
    }
  ]

  const curriculum = [
    { 
      phase: "Phase 1: Diagnostic & Foundation", 
      weeks: "Weeks 1-4",
      title: "The Scholar Blueprint", 
      desc: "Complete audit of your academic standing. We identify obstacles, align your research question, and build your 6-month strategic roadmap." 
    },
    { 
      phase: "Phase 2: Execution & Production", 
      weeks: "Weeks 5-16",
      title: "The Output Engine", 
      desc: "High-intensity writing and research phase. Weekly 1:1 sessions and 24-hour editorial turnaround for chapters or manuscripts." 
    },
    { 
      phase: "Phase 3: Positioning & Launch", 
      weeks: "Weeks 17-24",
      title: "The Academic Authority", 
      desc: "Focus shifts to defense prep, tenure positioning, and publication strategy. Finalizing your legacy for the next career stage." 
    }
  ]

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <Image 
          src="/images/hero.png" 
          alt="Elite Academic Transformation" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/80 to-transparent" />
        <div className="container relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-16 bg-secondary" />
            <h4 className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">Flagship Engagement</h4>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight mb-4 max-w-3xl">
            6-Month Elite <br />
            <span className="italic text-secondary text-xl md:text-3xl">Academic Transformation</span> <br /> Program™
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed mb-8 max-w-2xl opacity-90">
            Our most exclusive, end-to-end consulting experience. We don't just help you finish; we help you dominate your field and establish lasting scholarly authority.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="#pricing">
              <Button size="lg" className="h-16 px-10 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a] text-lg">
                SECURE YOUR SEAT
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 px-10 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent text-lg">
                BOOK EVALUATION
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Distinction Bar */}
      <section className="bg-primary py-12 border-y-4 border-secondary/30">
        <div className="container max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white/80">
            <div className="flex items-center gap-4">
              <Star className="text-secondary w-6 h-6 shrink-0" />
              <span className="text-xs uppercase font-bold tracking-widest leading-tight">Limited to 5 <br/> Scholars Per Cohort</span>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-secondary w-6 h-6 shrink-0" />
              <span className="text-xs uppercase font-bold tracking-widest leading-tight">Direct Access <br/> to Dr. Triplett</span>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="text-secondary w-6 h-6 shrink-0" />
              <span className="text-xs uppercase font-bold tracking-widest leading-tight">Priority <br/> Editorial Support</span>
            </div>
            <div className="flex items-center gap-4">
              <Users className="text-secondary w-6 h-6 shrink-0" />
              <span className="text-xs uppercase font-bold tracking-widest leading-tight">Global Alumni <br/> Network Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Content */}
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] group">
            <Image src="/images/leadership.png" alt="High-level consulting" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover rounded shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute -bottom-10 -right-10 bg-secondary p-12 hidden lg:block shadow-2xl">
              <Quote className="text-primary w-12 h-12 opacity-20 mb-4" />
              <p className="text-primary font-serif italic text-xl leading-relaxed max-w-xs">
                "The Elite program isn't just a service—it's a career pivot. We rebuild your scholarly identity from the ground up."
              </p>
              <div className="mt-6 flex items-center gap-3">
                 <div className="h-[1px] w-8 bg-primary/30" />
                 <span className="text-xs font-bold uppercase tracking-widest text-primary/70">Dr. William Triplett</span>
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif leading-tight">
              An End-to-End <br /> Strategic Engagement.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most academic support is piecemeal—an edit here, a coaching session there. The Elite Transformation Program™ is different. We take full ownership of your progress across all three Nexcellence pillars: Doctoral, Faculty, and Leadership.
            </p>
            <ul className="space-y-6">
              {[
                "Personalized 6-Month Roadmap & Milestone Tracking",
                "Unlimited 1:1 Strategy Sessions with Senior Consultants",
                "Priority 24-Hour Review Turnaround for all Manuscripts",
                "Comprehensive Tenure & Promotion Portfolio Development",
                "Curriculum Design & Course Architecture Support"
              ].map(item => (
                <li key={item} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                  <span className="text-primary font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who It's For - Premium Dark Section */}
      <section className="py-20 bg-[#0a192f] text-white">
        <div className="container max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">Who It's For</h4>
              <div className="h-[2px] w-12 bg-secondary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">Built for Serious Scholars</h2>
            <p className="max-w-2xl mx-auto text-white/60 font-light">This program is designed for those who are ready to make a decisive investment in their academic future.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whoItIsFor.map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 p-8 hover:border-secondary/50 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 text-white">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-[0.3em] text-sm">Success Stories</h4>
              <div className="h-[2px] w-12 bg-secondary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">Transformation in Their Words</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 p-10 elevated-card border-l-4 border-l-secondary">
                <Quote className="w-10 h-10 text-secondary/30 mb-6" />
                <p className="text-lg text-primary font-serif leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
                <div className="border-t border-slate-200 pt-6">
                  <p className="font-bold text-primary uppercase tracking-widest text-sm">{testimonial.name}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{testimonial.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Roadmap */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container max-w-7xl px-6 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-4 italic">The 24-Week Journey</h2>
          <p className="max-w-2xl mx-auto text-slate-500 font-light">The exact scaffolding required to transform your academic trajectory.</p>
        </div>
        <div className="container max-w-7xl px-6">
           <div className="grid md:grid-cols-3 gap-8">
              {curriculum.map((p) => (
                <div key={p.phase} className="bg-white elevated-card p-10 flex flex-col group border-t-4 border-t-secondary">
                   <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 bg-secondary/5 inline-block px-3 py-1 rounded-full w-fit group-hover:bg-secondary group-hover:text-primary transition-colors">{p.weeks}</div>
                   <h3 className="text-lg font-extrabold text-primary uppercase tracking-widest mb-6 font-sans">{p.title}</h3>
                   <div className="h-[2px] w-8 bg-slate-100 mb-8 group-hover:w-16 transition-all duration-500" />
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4 italic">{p.phase}</p>
                   <p className="text-sm text-slate-600 leading-relaxed font-light flex-1">{p.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing / Investment (Simulated) */}
      <section id="pricing" className="py-12 container max-w-7xl px-6">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-4">Financial Investment</h2>
          <p className="text-sm text-secondary font-bold uppercase tracking-[0.3em] bg-secondary/10 inline-block px-4 py-1">Limited Enrollments: Cohort Launch 2024</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Full Investment */}
          <div className="bg-[#192f59] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <Trophy className="w-16 h-16 text-secondary opacity-10 group-hover:opacity-30 transition-opacity" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Elite Full Investment</h3>
            <p className="text-white/70 text-sm mb-8">Save $1,000 by securing your transformation in a single payment.</p>
            <div className="text-6xl font-black text-secondary mb-10 flex items-baseline gap-2">
              $6,000 <span className="text-lg opacity-40 font-normal uppercase tracking-widest">USD</span>
            </div>
            <ul className="space-y-4 mb-12">
               <li className="flex gap-3 text-sm opacity-90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Full Access Immediate Onboarding</li>
               <li className="flex gap-3 text-sm opacity-90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Priority Cohort Placement</li>
               <li className="flex gap-3 text-sm opacity-90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Bonus Masterclass Access</li>
            </ul>
            <Link href="/checkout/success?program=elite">
              <Button className="w-full h-16 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20 text-lg">
                ENROLL NOW [SIMULATED]
              </Button>
            </Link>
          </div>

          {/* Payment Plan */}
          <div className="border-4 border-muted p-12 bg-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-widest text-primary mb-4">Strategic Plan</h3>
              <p className="text-muted-foreground text-sm mb-8">Spread the investment over the first 3 months of the program.</p>
              <div className="text-4xl font-black text-primary mb-2">
                $2,500 <span className="text-sm opacity-40 font-normal uppercase tracking-widest">Deposit</span>
              </div>
              <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-10">+ $1,750 × 2 Monthly Payments</p>
              <ul className="space-y-4 mb-12">
                 <li className="flex gap-3 text-sm text-primary/70"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Flexible Monthly Invoicing</li>
                 <li className="flex gap-3 text-sm text-primary/70"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Standard Onboarding Queue</li>
                 <li className="flex gap-3 text-sm text-primary/70"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Full Resource Access</li>
              </ul>
            </div>
            <Link href="/checkout/success?program=elite-plan">
              <Button className="w-full h-16 bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20 text-lg">
                START WITH DEPOSIT [SIMULATED]
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#192f59]">
        <div className="container max-w-4xl px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-6">Ready to Transform Your Academic Future?</h2>
          <p className="text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">Limited to 5 scholars per cohort. Join the next cohort and secure your place in the Elite Academic Transformation Program™.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/checkout/success?program=elite">
              <Button size="lg" className="h-16 px-12 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a] text-lg">
                Enroll in Elite Program
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" variant="outline" className="h-16 px-12 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent text-lg">
                Apply Now
              </Button>
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-8 uppercase tracking-widest">Questions? <Link href="/contact" className="text-secondary hover:underline">Contact us</Link></p>
        </div>
      </section>
      
      {/* Simulation Notice */}
      <section className="bg-muted py-8 text-center text-[10px] uppercase tracking-[0.5em] text-muted-foreground opacity-50">
        Nexcellence Academy™ Global Academic Scaffolding  // Checkout Simulation Mode Active
      </section>
    </div>
  )
}
