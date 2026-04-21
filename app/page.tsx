import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Search, GraduationCap, Globe, ChevronRight, Trophy, TrendingUp, Users, CalendarCheck, Medal, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-32">
        <Image 
          src="/images/hero.png" 
          alt="Nexcellence Academy Campus" 
          fill 
          sizes="100vw"
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-[#0a192f]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/60 via-transparent to-[#0a192f]/95" />
        
        <div className="container relative z-10 text-center max-w-5xl flex-1 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white font-serif tracking-tight leading-tight mb-4 max-w-3xl mx-auto drop-shadow-2xl">
            Advancing Scholars into <br />
            <span className="italic text-secondary">Faculty, Research, and Leadership</span> <br className="hidden md:block" /> Excellence.
          </h1>
          <p className="text-base text-white mb-8 font-normal drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
            Strategic academic consulting for doctoral scholars, faculty, academic leaders, curriculum designers, and aspiring authors.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link href="/apply">
              <Button size="lg" className="h-14 px-8 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a] transition-all">
                Book a Consultation
              </Button>
            </Link>
            <Link href="/services/doctoral">
              <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent transition-all">
                Start My Academic Strategy
              </Button>
            </Link>
          </div>
          
          <div className="text-center text-white hidden md:block pt-8 border-t border-white/20 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest uppercase text-secondary mb-3 drop-shadow-md">Where Are You in Your Academic Journey?</h2>
            <p className="text-lg drop-shadow-md">Nexcellence Academy™ supports scholars and leaders at every stage. Choose the path that fits where you are right now.</p>
          </div>
        </div>
      </section>

      {/* Feature Grid (Overlapping) */}
      <section className="relative z-20 container max-w-7xl pb-16">
        <div className="grid md:grid-cols-3 gap-8 md:-mt-24 -mt-4">
          <Link href="/services/doctoral" className="bg-white elevated-card p-6 md:p-10 flex flex-col items-center text-center group cursor-pointer">
            <Search className="w-8 h-8 md:w-10 md:h-10 text-secondary mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-widest mb-3 md:mb-4 text-primary font-sans">Doctoral Academy</h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed">Completing your dissertation feels impossible. You're stuck, overwhelmed, or running out of time. We provide the structure, coaching, and editing support to get you to the finish line.</p>
          </Link>
          <Link href="/services/faculty" className="bg-white elevated-card p-6 md:p-10 flex flex-col items-center text-center group cursor-pointer border-t-4 border-t-secondary">
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 text-secondary" />
            <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-widest mb-3 md:mb-4 text-primary font-sans">Faculty Advancement</h3>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">You've earned your degree. Now it's time to publish, position, and advance. We help faculty build research profiles, navigate tenure, and establish scholarly authority.</p>
          </Link>
          <Link href="/services/leadership" className="bg-white elevated-card p-6 md:p-10 flex flex-col items-center text-center group cursor-pointer">
            <Globe className="w-8 h-8 md:w-10 md:h-10 text-secondary mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-widest mb-3 md:mb-4 text-primary font-sans">Leadership</h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed">You lead people, programs, or institutions. We provide executive coaching, curriculum strategy, and consulting for administrators who want to build lasting academic impact.</p>
          </Link>
        </div>
      </section>

      {/* About Section - How It Works */}
      <section className="py-12 container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h2 className="text-secondary font-bold uppercase tracking-widest text-sm">How It Works</h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 leading-tight">
              Your Path to <br/> Academic Excellence
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { step: "1", title: "Book a Consultation", desc: "Schedule a free strategy call to discuss your goals, challenges, and the right services for your stage.", icon: CalendarCheck },
                { step: "2", title: "Define Your Strategy", desc: "Together we map out a clear plan with milestones, timelines, and deliverables tailored to your academic journey.", icon: Trophy },
                { step: "3", title: "Receive Support", desc: "Work with Dr. Triplett and the Nexcellence team through coaching sessions, reviews, and accountability.", icon: Users },
                { step: "4", title: "Advance", desc: "Defend your dissertation, earn tenure, publish your research — with expert support every step.", icon: Medal }
              ].map((item, idx) => (
                <div key={idx} className="bg-white elevated-card p-6 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">{item.step}</div>
                    <h5 className="font-bold text-sm text-primary uppercase tracking-wider">{item.title}</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <Link href="/services/doctoral" className="mt-8 text-primary font-bold uppercase tracking-widest flex items-center hover:text-secondary transition-colors text-sm">
              Explore Our Services <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="relative h-[600px] w-full mt-10 lg:mt-0">
            <div className="absolute top-0 right-0 w-[80%] h-[70%] z-10 transition-transform duration-700 hover:scale-[1.02]">
              <Image src="/images/leadership.png" alt="" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover shadow-xl border-8 border-white" role="presentation" aria-hidden="true" />
            </div>
            <div className="absolute bottom-10 left-0 w-[65%] h-[55%] z-20 transition-transform duration-700 hover:scale-[1.05]">
              <Image src="/images/doctoral.png" alt="" fill sizes="(min-width: 1024px) 33vw, 65vw" className="object-cover shadow-2xl border-8 border-white" role="presentation" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof Bar (Parallax Stats imitation) */}
      <section className="bg-[url('/images/doctoral.png')] bg-cover bg-center bg-fixed bg-no-repeat relative py-24 border-y-8 border-secondary" role="img" aria-label="Decorative background showing academic setting">
         <div className="absolute inset-0 bg-[#192f59]/90" aria-hidden="true" />
         <div className="container relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
             <div className="space-y-3">
               <Users className="w-12 h-12 text-secondary mx-auto mb-2" />
               <h3 className="text-4xl md:text-5xl font-bold font-serif text-secondary">200+</h3>
               <p className="uppercase tracking-widest text-sm font-bold opacity-90">Doctoral Scholars Supported</p>
             </div>
             <div className="space-y-3">
               <Trophy className="w-12 h-12 text-secondary mx-auto mb-2" />
               <h3 className="text-4xl md:text-5xl font-bold font-serif text-secondary">94%</h3>
               <p className="uppercase tracking-widest text-sm font-bold opacity-90">Dissertation Completion Rate</p>
             </div>
             <div className="space-y-3">
               <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-2" />
               <h3 className="text-4xl md:text-5xl font-bold font-serif text-secondary">40+</h3>
               <p className="uppercase tracking-widest text-sm font-bold opacity-90">Faculty Advanced to Tenure</p>
             </div>
             <div className="space-y-3">
               <CalendarCheck className="w-12 h-12 text-secondary mx-auto mb-2" />
               <h3 className="text-4xl md:text-5xl font-bold font-serif text-secondary">15+</h3>
               <p className="uppercase tracking-widest text-sm font-bold opacity-90">Years Academic Experience</p>
             </div>
           </div>
         </div>
      </section>

      {/* Elite Callout Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container text-center max-w-4xl px-6">
          <div className="bg-white elevated-card p-12 md:p-16 max-w-3xl mx-auto border-t-8 border-t-secondary">
            <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 text-secondary">
              <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-6 text-primary italic">Ready for a Full Transformation?</h2>
            <p className="text-base text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              The <strong>6-Month Elite Academic Transformation Program™</strong> is our most exclusive engagement — combining doctoral coaching, faculty positioning, and leadership development into one structured journey.
            </p>
            <Link href="/elite">
              <Button size="lg" className="h-16 px-12 bg-primary hover:bg-secondary hover:text-primary text-white font-bold uppercase tracking-widest rounded-none transition-all group">
                Apply for Cohort Launch <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer pre-banner */}
      <section className="bg-primary py-12 text-center text-white border-t border-white/10">
         <div className="container max-w-4xl">
           <h2 className="text-4xl md:text-5xl font-serif mb-6">
             Your Next Level Starts Here.
           </h2>
           <p className="text-xl opacity-80 font-light mb-10 max-w-2xl mx-auto">
             Whether you're defending next semester or building a faculty legacy, Nexcellence Academy™ has the tools, coaching, and expertise to get you there.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/apply">
               <Button size="lg" className="h-14 px-8 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none transition-all">
                 Book a Consultation
               </Button>
             </Link>
             <Link href="/services/doctoral">
               <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent transition-all">
                 Explore Services
               </Button>
             </Link>
           </div>
         </div>
      </section>
    </div>
  )
}
