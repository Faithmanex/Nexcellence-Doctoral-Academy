'use client'

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/ServiceCard"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, FileEdit, GraduationCap, Microscope, Book, Presentation, Mail, Target, Clock, Edit } from "lucide-react"

function DoctoralContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const plans: { title: string; price: string; desc: string; icon: typeof Clock; type: "coaching" | "consultation"; href?: string }[] = [
    { 
      title: "90-Day Dissertation Completion Program",
      price: "$3,997",
      desc: "Comprehensive structure and coaching to finish your dissertation in 90 days. Payment plans available.",
      icon: Clock,
      type: "coaching",
      href: "/services/doctoral/90-day"
    },
    { 
      title: "Dissertation Success Package",
      price: "$1,200",
      desc: "Complete support package through your entire dissertation process. Payment plans available.",
      icon: Book,
      type: "coaching"
    },
    {
      title: "Full Dissertation Editing",
      price: "$2,500 - $3,000",
      desc: "Comprehensive editing for the entire dissertation, ensuring scholarly excellence and format compliance.",
      icon: FileEdit,
      type: "coaching"
    },
    {
      title: "Proposal Editing",
      price: "$1,100",
      desc: "Rigorous review and editing of your dissertation proposal to ensure it's defense-ready.",
      icon: Edit,
      type: "coaching"
    },
    {
      title: "Chapter Editing",
      price: "$500",
      desc: "Professional editing for argument clarity, structure, and academic tone per chapter.",
      icon: FileEdit,
      type: "coaching"
    },
    {
      title: "Dissertation Accelerator Weekend",
      price: "$497",
      desc: "Intensive weekend workshop to rapidly advance your dissertation progress.",
      icon: Target,
      type: "coaching",
      href: "/services/doctoral/accelerator"
    },
    { 
      title: "Monthly Dissertation Coaching", 
      price: "$350/mo",
      desc: "Ongoing monthly support for scholars who need consistent accountability and feedback.",
      icon: GraduationCap,
      type: "coaching"
    },
    { 
      title: "Defense Preparation Coaching",
      price: "$350",
      desc: "Mock defense sessions and strategic preparation to ensure you defend with confidence.",
      icon: Presentation,
      type: "consultation"
    },
    {
      title: "Research Consultation",
      price: "$300",
      desc: "Methodological support: research design, data analysis approach, and theoretical alignment.",
      icon: Microscope,
      type: "consultation"
    },
    {
      title: "Dissertation Strategy Session",
      price: "$250",
      desc: "One focused 60-minute session to cut through the confusion and build a clear path forward.",
      icon: Target,
      type: "consultation"
    }
  ]

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchQuery) || 
    plan.desc.toLowerCase().includes(searchQuery)
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative min-h-[35vh] flex items-end overflow-hidden">
        <Image 
          src="/images/doctoral.png" 
          alt="Doctoral Academy" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-[10px] font-sans">Scholarly Excellence</h4>
            </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white font-serif uppercase tracking-tight">Doctoral Academy</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 container max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif leading-tight italic">
              Expert Doctoral Support <br className="hidden md:block" /> at Every Stage.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              From your first chapter to your final defence — coaching, editing, and research support designed for doctoral scholars who are serious about finishing. Clarity, accountability, and expert guidance — every step of the way.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6 items-stretch">
              {filteredPlans.length > 0 ? filteredPlans.map(plan => (
                <div key={plan.title} className="h-full">
                  <ServiceCard
                    title={plan.title}
                    price={plan.price}
                    desc={plan.desc}
                    icon={plan.icon}
                    type={plan.type}
                    href={plan.href}
                  />
                </div>
              )) : (
                <div className="col-span-2 py-20 text-center bg-slate-50 elevated-card border-t-8 border-secondary">
                   <p className="text-slate-500 font-serif italic">No matching programs found for &quot;{searchQuery}&quot;</p>
                   <Button asChild variant="link" className="text-primary mt-4 font-bold uppercase tracking-widest text-[10px]">
                      <Link href="/services/doctoral">View All Programs</Link>
                   </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0a192f] p-10 text-white rounded-none shadow-2xl">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 font-sans">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <p className="text-sm opacity-80 leading-relaxed font-sans">operations@nexcellenceacademy.com</p>
                </div>
              </div>
              <Button asChild className="w-full bg-secondary text-primary hover:bg-secondary/90 hover:scale-[1.02] transition-all font-bold uppercase tracking-widest rounded-none h-14 border-b-4 border-[#c2820a] mt-8 block">
                <Link href="/contact">
                  Enquire Now
                </Link>
              </Button>
            </div>

            <div className="bg-[#0a192f] shadow-2xl p-10 text-white border-t-8 border-t-secondary rounded-none">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-white/40">Our Expertise</h3>
              <div className="space-y-5">
                {[
                  { label: "Methodology Alignment", icon: Target },
                  { label: "APA/Chicago Compliance", icon: FileEdit },
                  { label: "Defense Readiness", icon: Presentation },
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

function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[45vh] bg-[#0a192f] flex items-end">
        <div className="container relative z-10 pb-12">
          <div className="h-[2px] w-12 bg-secondary mb-4" />
          <div className="h-8 w-48 bg-white/20 rounded animate-pulse" />
        </div>
      </section>
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 w-full bg-gray-100 rounded animate-pulse" />
            <div className="grid md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white p-10 shadow-sm">
                  <div className="h-12 w-12 bg-gray-100 rounded-xl mb-6 animate-pulse" />
                  <div className="h-6 w-full bg-gray-200 rounded mb-4 animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded mb-8 animate-pulse" />
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function DoctoralAcademy() {
  return (
    <Suspense fallback={<LoadingState />}>
      <DoctoralContent />
    </Suspense>
  )
}
