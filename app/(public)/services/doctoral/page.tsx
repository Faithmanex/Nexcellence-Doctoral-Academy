'use client'

import { Suspense } from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, FileEdit, GraduationCap, Microscope, Book, Presentation, Mail, ArrowRight, Globe, Target } from "lucide-react"

function DoctoralContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  const plans = [
    { 
      title: "Dissertation Strategy Session", 
      price: "$250",
      desc: "One focused 60-minute session to cut through the confusion and build a clear path forward.",
      icon: Target
    },
    { 
      title: "Research Consultation", 
      price: "$300",
      desc: "Methodological support: research design, data analysis approach, and theoretical alignment.",
      icon: Microscope 
    },
    { 
      title: "Monthly Dissertation Coaching", 
      price: "$350/mo",
      desc: "Ongoing monthly support for scholars who need consistent accountability and feedback.",
      icon: GraduationCap
    },
    { 
      title: "Chapter Editing", 
      price: "$500",
      desc: "Professional editing for argument clarity, structure, and academic tone.",
      icon: FileEdit
    }
  ]

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchQuery) || 
    plan.desc.toLowerCase().includes(searchQuery)
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Kingster Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
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
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Scholarly Excellence</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Doctoral Academy</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif leading-tight">
              Expert Doctoral Support <br/> at Every Stage.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              From your first chapter to your final defence — coaching, editing, and research support designed for doctoral scholars who are serious about finishing. Clarity, accountability, and expert guidance — every step of the way.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6">
              {filteredPlans.length > 0 ? filteredPlans.map(plan => (
                <div key={plan.title} className="bg-white elevated-card p-10 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                    <Book className="w-6 h-6 text-secondary" />
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
              )) : (
                <div className="col-span-2 py-20 text-center bg-white elevated-card bg-slate-50">
                   <p className="text-slate-400 font-serif italic">No matching programs found for "{searchQuery}"</p>
                   <Link href="/services/doctoral">
                      <Button variant="link" className="text-secondary mt-4 font-bold uppercase tracking-widest text-xs">View All Programs</Button>
                   </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#192f59] p-10 text-white">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <p className="text-sm opacity-80 leading-relaxed">operations@nexcellenceacademy.com</p>
                </div>
              </div>
              <Link href="/contact" className="mt-8 block">
                <Button className="w-full bg-secondary text-primary font-bold uppercase tracking-widest rounded-none h-14 border-b-4 border-[#c2820a]">
                  Enquire Now
                </Button>
              </Link>
            </div>

            <div className="bg-slate-900 elevated-card p-10 text-white border-t-8 border-t-secondary">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-white/40">Our Expertise</h3>
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
      <section className="relative h-[40vh] bg-[#0a192f] flex items-end">
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
