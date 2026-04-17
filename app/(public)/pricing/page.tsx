'use client'

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ShieldCheck, CreditCard, GraduationCap, Users, Briefcase, FileText, BookOpen, Crown } from "lucide-react"

const serviceCategories = [
  {
    category: "Doctoral Academy",
    slug: "doctoral",
    icon: GraduationCap,
    services: [
      {
        name: "90-Day Dissertation Program",
        price: "$3,997",
        plan: "$1,497 deposit + $1,250 × 2",
        url: "/checkout/success?program=90day"
      },
      {
        name: "Dissertation Strategy Session",
        price: "$250",
        plan: "One-time payment",
        url: "/checkout/success?program=strategy-session"
      },
      {
        name: "Research Consultation",
        price: "$300",
        plan: "One-time payment",
        url: "/checkout/success?program=research-consultation"
      },
      {
        name: "Monthly Dissertation Coaching",
        price: "$350/mo",
        plan: "Recurring monthly",
        url: "/checkout/success?program=monthly-coaching"
      },
      {
        name: "Dissertation Success Package",
        price: "$1,200",
        plan: "$400 + $400 + $400",
        url: "/checkout/success?program=success-package"
      },
      {
        name: "Workshop Registration",
        price: "$497",
        plan: "One-time payment",
        url: "/checkout/success?program=workshop"
      }
    ]
  },
  {
    category: "Faculty Advancement",
    slug: "faculty",
    icon: Users,
    services: [
      {
        name: "Academic Identity & Scholarly Positioning™",
        price: "$1,000",
        plan: "$400 + $300 + $300",
        url: "/checkout/success?program=academic-identity"
      },
      {
        name: "Research & Publication Strategy",
        price: "$1,200",
        plan: "$400 + $400 + $400",
        url: "/checkout/success?program=publication-strategy"
      },
      {
        name: "Tenure & Promotion Strategy",
        price: "$1,500",
        plan: "$500 + $500 + $500",
        url: "/checkout/success?program=tenure-strategy"
      },
      {
        name: "Faculty Success Package",
        price: "$1,200",
        plan: "$400 + $400 + $400",
        url: "/checkout/success?program=faculty-success"
      },
      {
        name: "Faculty Coaching & Mentorship",
        price: "$350/mo",
        plan: "Recurring monthly",
        url: "/checkout/success?program=faculty-coaching"
      }
    ]
  },
  {
    category: "Academic Leadership",
    slug: "leadership",
    icon: Briefcase,
    services: [
      {
        name: "Leadership Intensive",
        price: "$2,500",
        plan: "$1,000 + $750 + $750",
        url: "/checkout/success?program=leadership-intensive"
      },
      {
        name: "1:1 Academic Strategy Session",
        price: "$250",
        plan: "One-time payment",
        url: "/checkout/success?program=leadership-session"
      },
      {
        name: "Monthly Leadership Advisory",
        price: "$1,200/mo",
        plan: "Recurring monthly",
        url: "/checkout/success?program=leadership-advisory"
      }
    ]
  },
  {
    category: "Curriculum Design",
    slug: "curriculum",
    icon: FileText,
    services: [
      {
        name: "Custom Course Design",
        price: "$1,200",
        plan: "$400 + $400 + $400",
        url: "/checkout/success?program=course-design"
      },
      {
        name: "Course Enhancement / Redesign",
        price: "$1,500",
        plan: "$500 + $500 + $500",
        url: "/checkout/success?program=course-enhancement"
      },
      {
        name: "Multi-Course Program Design",
        price: "$4,500",
        plan: "$1,500 + $1,500 + $1,500",
        url: "/checkout/success?program=program-design"
      },
      {
        name: "Certificate / Training Program",
        price: "$1,800",
        plan: "$600 + $600 + $600",
        url: "/checkout/success?program=certificate-program"
      },
      {
        name: "Academic Program Proposal",
        price: "$2,000",
        plan: "$750 + $625 + $625",
        url: "/checkout/success?program=program-proposal"
      }
    ]
  },
  {
    category: "Research & Publishing",
    slug: "publishing",
    icon: GraduationCap,
    services: [
      {
        name: "Proposal Development",
        price: "$1,800",
        plan: "$600 + $600 + $600",
        url: "/checkout/success?program=proposal-development"
      },
      {
        name: "Full Dissertation Edit",
        price: "$2,500–$3,000",
        plan: "Varies by length",
        url: "/checkout/success?program=full-edit"
      },
      {
        name: "Chapter Editing",
        price: "$500/ch",
        plan: "Per chapter",
        url: "/checkout/success?program=chapter-edit"
      },
      {
        name: "Proposal Editing",
        price: "$1,100",
        plan: "$400 + $350 + $350",
        url: "/checkout/success?program=proposal-edit"
      },
      {
        name: "Defense Preparation",
        price: "$350",
        plan: "One-time payment",
        url: "/checkout/success?program=defense-prep"
      },
      {
        name: "Journal Article Development",
        price: "$1,500",
        plan: "$500 + $500 + $500",
        url: "/checkout/success?program=journal-article"
      },
      {
        name: "Manuscript Review (Standard)",
        price: "$300",
        plan: "One-time payment",
        url: "/checkout/success?program=manuscript-review"
      },
      {
        name: "Manuscript Review (Extended)",
        price: "$450",
        plan: "One-time payment",
        url: "/checkout/success?program=manuscript-review-ext"
      },
      {
        name: "Journal Targeting Strategy",
        price: "$200",
        plan: "One-time payment",
        url: "/checkout/success?program=journal-targeting"
      }
    ]
  },
  {
    category: "Book Publishing & Authorship",
    slug: "book",
    icon: BookOpen,
    services: [
      {
        name: "Book Publishing Coaching Program",
        price: "$2,500",
        plan: "$1,000 + $750 + $750",
        url: "/checkout/success?program=book-coaching"
      },
      {
        name: "Book Writing & Structure Coaching",
        price: "$1,200",
        plan: "$400 + $400 + $400",
        url: "/checkout/success?program=book-writing"
      },
      {
        name: "Self-Publishing Strategy",
        price: "$750",
        plan: "$250 + $250 + $250",
        url: "/checkout/success?program=self-publishing"
      },
      {
        name: "Author Positioning & Launch Strategy",
        price: "$900",
        plan: "$300 + $300 + $300",
        url: "/checkout/success?program=author-positioning"
      },
      {
        name: "Book Proposal Development",
        price: "$600",
        plan: "$200 + $200 + $200",
        url: "/checkout/success?program=book-proposal"
      }
    ]
  },
  {
    category: "Elite Academic Transformation",
    slug: "elite",
    icon: Crown,
    services: [
      {
        name: "Elite Transformation Program (Full)",
        price: "$6,000",
        plan: "$2,500 + $1,750 + $1,750",
        url: "/checkout/success?program=elite-program"
      },
      {
        name: "Elite — Deposit",
        price: "$2,500",
        plan: "First instalment",
        url: "/checkout/success?program=elite-deposit"
      },
      {
        name: "Elite — Monthly Instalments",
        price: "$1,750 × 2",
        plan: "Instalments 2 & 3",
        url: "/checkout/success?program=elite-monthly"
      }
    ]
  }
]

const enhancementServices = [
  {
    name: "Document Review & Enhancement",
    price: "$150",
    url: "/checkout/success?program=doc-review"
  },
  {
    name: "Academic Portfolio Review",
    price: "$400",
    url: "/checkout/success?program=portfolio-review"
  },
  {
    name: "Priority / Expedited Service",
    price: "$200–$500",
    url: "/checkout/success?program=expedited"
  }
]

function PricingContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Pricing" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-secondary" />
            <h4 className="text-secondary font-bold uppercase tracking-widest text-sm font-sans">Complete Service Catalogue</h4>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Pricing & Services</h1>
        </div>
      </section>

      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {serviceCategories.map(section => {
              const Icon = section.icon
              return (
                <div key={section.category} className="bg-white elevated-card p-10">
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary font-serif uppercase tracking-tight">{section.category}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.services.map(service => (
                      <div key={service.name} className="group bg-slate-50/50 p-6 border border-slate-100 hover:border-secondary/30 transition-all">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-2">{service.name}</h3>
                            <p className="text-xs text-slate-500 font-light">{service.plan}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-xl text-primary font-serif whitespace-nowrap">{service.price}</span>
                            <a href={service.url} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-10 px-4">
                                Enroll
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {section.slug !== 'elite' && (
                    <Link href={`/services/${section.slug}`} className="inline-block mt-6">
                      <Button variant="link" className="text-secondary font-bold uppercase tracking-widest text-xs p-0 h-auto">
                        View Details <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              )
            })}

            <div className="bg-[#f8f5f0] elevated-card p-10 border-l-4 border-l-secondary">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-secondary/20">
                <h2 className="text-xl font-bold text-primary font-serif uppercase tracking-tight">Enhancement Services</h2>
              </div>
              <div className="space-y-4">
                {enhancementServices.map(service => (
                  <div key={service.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-secondary/10 last:border-0">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest">{service.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg text-primary font-serif">{service.price}</span>
                      <a href={service.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-[10px] rounded-none h-9 px-4">
                          Add
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-secondary p-10 text-primary">
              <ShieldCheck className="w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Secure Enrollment</h3>
              <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
                All transactions are processed securely via Stripe. Enrollment confirmation and access tokens are sent immediately upon payment success.
              </p>
              <div className="flex gap-4">
                <CreditCard className="w-6 h-6 opacity-40" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Visa / MC / Amex</span>
              </div>
            </div>

            <div className="bg-[#192f59] p-10 text-white">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Need a Custom Plan?</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6 font-light">
                We offer flexible payment plans for higher-tier engagements. Contact us to discuss your specific needs.
              </p>
              <Link href="/contact">
                <Button className="w-full bg-white text-primary font-bold uppercase tracking-widest rounded-none h-14 border-b-4 border-gray-300 hover:bg-secondary hover:text-primary">
                  Inquire Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-slate-900 elevated-card p-10 text-white border-t-8 border-t-secondary">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-white/40">What's Included</h3>
              <div className="space-y-5">
                {[
                  "Personalised academic strategy",
                  "Expert feedback & revision support",
                  "Unlimited email check-ins",
                  "Defense readiness preparation"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/70">{item}</span>
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
          <div className="lg:col-span-2 space-y-12">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white p-10 shadow-sm">
                <div className="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse" />
                <div className="space-y-4">
                  {[1,2,3,4].map(j => (
                    <div key={j} className="bg-slate-50 p-6">
                      <div className="h-5 w-3/4 bg-gray-100 rounded animate-pulse mb-3" />
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function PricingCatalogue() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PricingContent />
    </Suspense>
  )
}