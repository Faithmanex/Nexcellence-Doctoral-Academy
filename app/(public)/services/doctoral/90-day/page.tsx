import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  BookOpen,
  Microscope,
  Presentation,
  MessageSquare,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "90-Day Dissertation Completion Program | Nexcellence Academy™",
  description:
    "A structured, high-touch coaching program designed to take doctoral scholars from stuck to defended. Clarity, accountability, and expert guidance — every step of the way.",
}

export default function Dissertation90Day() {
  const qualifiers = [
    "You've been ABD (All But Dissertation) for longer than you planned.",
    "You have a topic and a committee but can't seem to make consistent progress.",
    "You feel isolated, overwhelmed, or unsure where to focus each week.",
    "You're working full-time and need a system that fits your schedule.",
    "You want to defend within the next 6 months.",
  ]

  const inclusions = [
    {
      icon: Calendar,
      label: "Weekly 1:1 coaching sessions with Dr. Triplett",
      detail: "Structured around your chapter goals",
    },
    {
      icon: BookOpen,
      label: "Chapter-by-chapter writing accountability and feedback",
    },
    {
      icon: Microscope,
      label: "Research methodology support and committee alignment coaching",
    },
    {
      icon: Presentation,
      label: "Defense readiness preparation in the final phase",
    },
    {
      icon: MessageSquare,
      label: "Direct messaging support between sessions",
    },
    {
      icon: LayoutDashboard,
      label: "Access to the Nexcellence client dashboard for milestone tracking",
    },
  ]

  const roadmap = [
    {
      month: "Month 1",
      title: "Foundations",
      desc: "Clarify your research question, align with your committee, establish a realistic writing schedule, and complete or strengthen your literature review.",
    },
    {
      month: "Month 2",
      title: "Execution",
      desc: "Write and refine your methodology and findings chapters. Weekly check-ins keep momentum. Feedback loops prevent stalling.",
    },
    {
      month: "Month 3",
      title: "Completion",
      desc: "Final chapters, full draft review, defense preparation, and submission readiness. You finish this month prepared to defend.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* ───── HERO ───── */}
      <section className="relative pt-32 md:pt-40 pb-12 flex items-end overflow-hidden">
        <Image
          src="/images/doctoral.png"
          alt="90-Day Dissertation Completion Program"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a192f]/85" />

        <div className="container relative z-20 max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-secondary" />
            <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] font-sans">
              High-Touch Coaching
            </h4>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-serif uppercase tracking-tight">
            Finish Your Dissertation in 90&nbsp;Days.
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mt-4 max-w-2xl">
            A structured, high-touch coaching program designed to take doctoral
            scholars from stuck to defended. Clarity, accountability, and expert
            guidance&nbsp;— every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 bg-secondary text-primary hover:bg-secondary/90 hover:scale-[1.02] transition-all font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a]"
            >
              <Link href="/apply?program=90-Day+Dissertation+Completion+Program">
                Enroll Now — $3,997
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest rounded-none bg-transparent hover:scale-[1.02] transition-all"
            >
              <Link href="/contact">Start with a Payment Plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ───── MAIN CONTENT ───── */}
      <section className="py-20 container max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* LEFT COLUMN — 2/3 */}
          <div className="lg:col-span-2 space-y-20">
            {/* WHO THIS IS FOR */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif italic mb-8 border-l-4 border-secondary pl-6">
                Is This Program Right for You?
              </h2>
              <ul className="space-y-5">
                {qualifiers.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-muted-foreground text-sm leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WHAT'S INCLUDED */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif italic mb-10 border-l-4 border-secondary pl-6">
                What's Included in 90&nbsp;Days
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {inclusions.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white elevated-card p-8 border-t-4 border-t-secondary rounded-none group"
                  >
                    <item.icon className="w-8 h-8 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-primary leading-snug">
                      {item.label}
                    </p>
                    {item.detail && (
                      <p className="text-xs text-muted-foreground mt-2 font-light">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 90-DAY ROADMAP */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif italic mb-10 border-l-4 border-secondary pl-6">
                Your 90-Day Roadmap
              </h2>
              <div className="space-y-0">
                {roadmap.map((step, i) => (
                  <div key={step.month} className="flex gap-8 group">
                    {/* Timeline column */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center font-serif font-bold text-primary group-hover:bg-secondary transition-colors duration-300 italic shrink-0">
                        {i + 1}
                      </div>
                      {i < 2 && (
                        <div className="w-[2px] flex-1 bg-slate-200 mt-2" />
                      )}
                    </div>

                    {/* Content column */}
                    <div className="pb-10">
                      <h3 className="text-base font-extrabold text-primary uppercase tracking-widest mb-2 font-sans">
                        {step.month} — {step.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed font-light text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICING & PAYMENT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif italic mb-10 border-l-4 border-secondary pl-6">
                Pricing &amp; Payment
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Pay in Full */}
                <div className="bg-[#0a192f] p-8 text-white rounded-none shadow-2xl border-t-8 border-t-secondary flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">
                    Pay in Full
                  </span>
                  <p className="text-3xl font-bold mb-2 font-serif">$3,997</p>
                  <p className="text-xs text-slate-400 font-light mb-8 flex-1">
                    One payment, maximum savings.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-14 bg-secondary text-primary hover:bg-secondary/90 hover:scale-[1.02] transition-all font-bold uppercase tracking-widest rounded-none border-b-4 border-[#c2820a] text-xs"
                  >
                    <Link href="/apply?program=90-Day+Dissertation+Completion+Program">
                      Enroll Now
                    </Link>
                  </Button>
                </div>

                {/* Payment Plan A */}
                <div className="bg-white elevated-card p-8 rounded-none border-t-8 border-t-secondary flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">
                    Payment Plan A
                  </span>
                  <p className="text-xl font-bold text-primary mb-2">
                    $1,497{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      deposit
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground font-light mb-8 flex-1">
                    Then $1,250 × 2 monthly payments.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] h-12 rounded-none transition-colors duration-300"
                  >
                    <Link href="/contact">Apply for Plan</Link>
                  </Button>
                </div>

                {/* Payment Plan B */}
                <div className="bg-white elevated-card p-8 rounded-none border-t-8 border-t-slate-200 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    Payment Plan B
                  </span>
                  <p className="text-xl font-bold text-primary mb-2">
                    3 Instalments
                  </p>
                  <p className="text-sm text-muted-foreground font-light mb-8 flex-1">
                    3 equal monthly instalments — contact us to arrange.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] h-12 rounded-none transition-colors duration-300"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ───── RIGHT SIDEBAR ───── */}
          <div className="space-y-8">
            {/* Quick Inclusions */}
            <div className="bg-[#0a192f] p-10 text-white rounded-none shadow-2xl">
              <ShieldCheck className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 font-sans">
                Program Includes
              </h3>
              <ul className="space-y-4 text-sm opacity-90 font-light">
                {[
                  "Weekly 1:1 Coaching",
                  "Writing Accountability",
                  "Methodology Support",
                  "Committee Alignment",
                  "Defense Prep Phase",
                  "Direct Messaging Access",
                  "Dashboard Milestone Tracking",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-50 p-10 elevated-card border-t-8 border-secondary rounded-none">
              <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 font-sans">
                Investment
              </h3>
              <p className="text-3xl font-bold text-primary mb-1">$3,997</p>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-6">
                Full Program
              </span>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-white border border-slate-200">
                  <p className="font-bold text-[10px] uppercase tracking-widest text-secondary mb-1">
                    Plan A
                  </p>
                  <p className="text-sm font-medium text-primary">
                    $1,497 deposit + $1,250 × 2 months
                  </p>
                </div>
                <div className="p-4 bg-white border border-slate-200">
                  <p className="font-bold text-[10px] uppercase tracking-widest text-secondary mb-1">
                    Plan B
                  </p>
                  <p className="text-sm font-medium text-primary">
                    3 equal monthly instalments
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-secondary text-primary hover:bg-secondary/90 hover:scale-[1.02] transition-all font-bold uppercase tracking-widest rounded-none h-14 border-b-4 border-[#c2820a] block"
              >
                <Link href="/apply?program=90-Day+Dissertation+Completion+Program">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Enroll Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] h-12 rounded-none transition-colors duration-300 mt-4 block"
              >
                <Link href="/contact">Apply for a Payment Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
