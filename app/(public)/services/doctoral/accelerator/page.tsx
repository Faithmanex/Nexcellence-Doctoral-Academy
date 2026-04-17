import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Zap, Rocket, Target, Quote, ArrowRight } from "lucide-react"

export default function acceleratorWeekend() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Accelerator Weekend" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#14213d]/85" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 bg-secondary text-primary font-bold uppercase tracking-widest text-xs mb-6">Intensive Two-Day Event</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif uppercase tracking-tight mb-6">Two Days. Total Clarity. <br /> Real Progress.</h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Break through writing blocks, organize your research, and build a concrete writing plan you’ll actually follow.
          </p>
          <a href="https://buy.stripe.com/dissertation-accelerator" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-16 px-10 bg-secondary text-primary hover:bg-secondary/90 font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a] text-lg">
              Register Now — $497
            </Button>
          </a>
        </div>
      </section>

      {/* Weekend Schedule */}
      <section className="py-24 container max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <h2 className="text-4xl font-bold text-primary font-serif uppercase tracking-tight leading-tight italic">The Accelerator Experience</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Dissertation Accelerator Weekend is an intensive two-day experience designed to transform intentions into pages. We identify your core argument, map your chapter structure, and eliminate the noise that's been slowing you down.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                 <div className="p-8 bg-muted rounded border-b-4 border-secondary">
                    <Target className="w-10 h-10 text-primary mb-6" />
                    <h3 className="text-xl font-extrabold text-primary uppercase tracking-widest mb-3 font-sans">Day 1: Clarity</h3>
                    <p className="text-sm text-muted-foreground">Identify your core argument and map your full chapter structure. Leave knowing exactly what needs to be written.</p>
                 </div>
                 <div className="p-8 bg-primary text-white rounded border-b-4 border-secondary">
                    <Rocket className="w-10 h-10 text-secondary mb-6" />
                    <h3 className="text-xl font-extrabold uppercase tracking-widest mb-3 font-sans">Day 2: Momentum</h3>
                    <p className="text-sm opacity-80">Build your writing plan, set 30-day milestones, and do a live working session to leave with actual progress.</p>
                 </div>
              </div>
           </div>

           <div className="bg-[#192f59] p-12 text-white relative shadow-2xl overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
              <Quote className="w-16 h-16 text-secondary mb-8 opacity-40" />
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Who Should Attend</h3>
              <ul className="space-y-6">
                 {[
                   "Scholars overwhelmed by the scope of their dissertation",
                   "Students with data who can't structure the argument",
                   "Writers who keep starting over and need commitment",
                   "Anyone seeking a productive weekend with deliverables"
                 ].map(item => (
                   <li key={item} className="flex gap-4 items-start">
                     <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                     <span className="text-base font-medium opacity-90">{item}</span>
                   </li>
                 ))}
              </ul>
              <div className="mt-12 pt-8 border-t border-white/10">
                 <p className="text-3xl font-bold text-secondary mb-2">$497</p>
                 <p className="text-xs uppercase tracking-widest opacity-60">Full Payment at Registration</p>
                 <a href="https://buy.stripe.com/dissertation-accelerator" target="_blank" rel="noopener noreferrer" className="mt-8 block">
                    <Button className="w-full h-14 bg-secondary text-primary font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20">
                      Reserve Your Spot
                    </Button>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}
