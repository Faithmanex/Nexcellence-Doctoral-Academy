"use client"
import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShieldCheck, GraduationCap, Star, CreditCard, Lock } from 'lucide-react'

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultProgram = searchParams.get("program") || ""

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    role_type: '',
    interested_in: defaultProgram,
    message: '',
    source: 'apply_page'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Payment mock state
  const [paymentDetails, setPaymentDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  })

  // Synchronize pre-selected program if the search param changes
  useEffect(() => {
    if (defaultProgram) {
      setFormData(prev => ({ ...prev, interested_in: defaultProgram }))
    }
  }, [defaultProgram])

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSimulatePaymentAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate 1.5s payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Write to contact_submissions after "payment" is approved
    const { error } = await supabase.from('contact_submissions').insert([formData])

    setLoading(false)
    if (!error) {
      setStep(3)
      setSuccess(true)
      // Redirect to registration page with email
      const encodedEmail = encodeURIComponent(formData.email)
      router.push(`/register?email=${encodedEmail}&source=checkout_success`)
    } else {
      console.error('Error submitting application:', error)
      alert("Submission failed. Please try again.")
    }
  }

  const serviceCategories = [
    "90-Day Dissertation Completion Program",
    "Dissertation Success Package",
    "Full Dissertation Editing",
    "Proposal Editing",
    "Chapter Editing",
    "Dissertation Accelerator Weekend",
    "Monthly Dissertation Coaching",
    "Faculty Advancement",
    "Academic Leadership",
    "Curriculum Design",
    "Dissertation & Publishing",
    "Book Publishing"
  ]

  const roleTypes = [
    "Doctoral Student",
    "Faculty Member",
    "Academic Leader / Administrator",
    "Aspiring Author",
    "Other"
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <Image 
          src="/images/hero.png" 
          alt="Apply to Nexcellence Academy" 
          fill 
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-transparent" />
        <div className="container relative z-10 pb-16 px-6 max-w-7xl mx-auto">
           <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-[0.3em] text-xs font-sans">Admissions</h4>
            </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif uppercase tracking-tight leading-tight">Apply for <br/> Academic Scaffolding</h1>
        </div>
      </section>

      <section className="py-20 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-20">
          {/* Main Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white elevated-card p-10 md:p-16 border-t-8 border-t-secondary relative">

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-12 relative z-10 pb-8 border-b border-slate-100">
                <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-secondary' : 'text-slate-300'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-secondary text-primary' : 'bg-slate-100'}`}>1</div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Details</span>
                </div>
                <div className="flex-1 h-[2px] bg-slate-100 mx-4 mt-[-20px]">
                  <div className={`h-full bg-secondary transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-secondary' : 'text-slate-300'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-secondary text-primary' : 'bg-slate-100'}`}>2</div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Payment</span>
                </div>
                <div className="flex-1 h-[2px] bg-slate-100 mx-4 mt-[-20px]">
                  <div className={`h-full bg-secondary transition-all ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-secondary' : 'text-slate-300'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-secondary text-primary' : 'bg-slate-100'}`}>3</div>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Done</span>
                </div>
              </div>

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-primary font-serif mb-4 italic">Program Application Form</h2>
                    <p className="text-slate-500 font-light">Please complete all fields below to begin your journey with Nexcellence Academy.</p>
                  </div>

                  <form onSubmit={handleContinueToPayment} className="space-y-10 font-sans">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary border-b border-slate-100 pb-2">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                            placeholder="e.g. Dr. Jane Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                            placeholder="name@university.edu"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Phone Number (Optional)</label>
                        <input 
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                          placeholder="+1 (000) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Academic Profile */}
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary border-b border-slate-100 pb-2">Academic Profile</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Current Role *</label>
                          <select
                            required
                            value={formData.role_type}
                            onChange={e => setFormData({...formData, role_type: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                          >
                            <option value="">Select your role...</option>
                            {roleTypes.map(role => <option key={role} value={role}>{role}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Interested In *</label>
                          <select
                            required
                            value={formData.interested_in}
                            onChange={e => setFormData({...formData, interested_in: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                          >
                            <option value="">Select a program...</option>
                            {/* Insert unique categories and handle ones not in the default list gracefully */}
                            {Array.from(new Set([...serviceCategories, ...(defaultProgram && !serviceCategories.includes(defaultProgram) ? [defaultProgram] : [])])).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary border-b border-slate-100 pb-2">Your Objectives</h3>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Tell us about your current situation & primary goals *</label>
                        <textarea
                          id="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                          placeholder="What specific challenges are you facing and what do you hope to achieve with Nexcellence Academy™?"
                          maxLength={1000}
                          aria-describedby="message-count"
                        />
                        <p id="message-count" className="text-[10px] text-slate-400 text-right uppercase tracking-widest" aria-live="polite">{formData.message.length} / 1000 characters</p>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto h-16 px-16 bg-primary text-white hover:bg-secondary hover:text-primary transition-all font-bold uppercase tracking-[0.2em] rounded-none border-b-4 border-black/20 text-sm"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="mb-8">
                    <button onClick={() => setStep(1)} className="text-xs text-slate-400 hover:text-primary uppercase tracking-widest font-bold mb-6 flex items-center gap-2">
                      ← Back to Details
                    </button>
                    <h2 className="text-2xl font-bold text-primary font-serif mb-2 italic">Secure Checkout</h2>
                    <p className="text-slate-500 font-light text-sm">Please provide your payment details below. Note: This is a demo payment flow.</p>
                  </div>

                  <div className="bg-slate-50 p-8 border border-slate-200 mb-8">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-6">
                      <div>
                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider">{formData.interested_in || 'Selected Program'}</h4>
                        <p className="text-xs text-slate-500 mt-2">{formData.name}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-primary font-bold">
                      <span className="text-sm uppercase tracking-widest">Total Due</span>
                      <span className="text-xl">DEMO</span>
                    </div>
                  </div>

                  <form onSubmit={handleSimulatePaymentAndSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-primary/80 mb-4">
                        <Lock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Payment Information</span>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Name on Card *</label>
                        <input
                          type="text"
                          required
                          value={paymentDetails.nameOnCard}
                          onChange={e => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                          className="w-full p-4 bg-white border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                          placeholder={formData.name || "Name"}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Card Number *</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={paymentDetails.cardNumber}
                            onChange={e => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm tracking-widest"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                          />
                          <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Expiration *</label>
                          <input
                            type="text"
                            required
                            value={paymentDetails.expiry}
                            onChange={e => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                            className="w-full p-4 bg-white border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">CVC *</label>
                          <input
                            type="text"
                            required
                            value={paymentDetails.cvc}
                            onChange={e => setPaymentDetails({...paymentDetails, cvc: e.target.value})}
                            className="w-full p-4 bg-white border border-slate-200 rounded-none focus:border-secondary outline-none transition-all text-sm"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full h-16 bg-primary text-white hover:bg-secondary hover:text-primary transition-all font-bold uppercase tracking-[0.2em] rounded-none border-b-4 border-black/20 text-sm flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            Submit Payment
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-medium mt-4">Transactions are secure and encrypted.</p>
                  </form>
                </div>
              )}

              {step === 3 && (
                 <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-10 h-10 text-green-600" />
                   </div>
                   <h2 className="text-3xl font-bold text-primary font-serif mb-4 italic">Payment Successful</h2>
                   <p className="text-slate-500 mb-8 max-w-md mx-auto">Redirecting you to registration...</p>
                 </div>
              )}

            </div>
          </div>

          {/* Context Sidebar */}
          <div className="space-y-12">
            <div className="bg-[#0a192f] p-10 text-white rounded-none border-t-8 border-t-secondary shadow-2xl">
              <ShieldCheck className="w-12 h-12 text-secondary mb-8" />
              <h3 className="text-xl font-extrabold uppercase tracking-widest mb-6 font-serif italic">The Nexcellence Standard</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 font-light italic">&quot;We only accept scholars and leaders we are certain we can advance. Every application is reviewed personally by Dr. Triplett to ensure cohort alignment and mission integrity.&quot;</p>
              
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-secondary" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Elite Vetting</h4>
                      <p className="text-xs text-gray-400">Ensuring high-quality outcomes for every participant.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Zero Cost Evaluation</h4>
                      <p className="text-xs text-gray-400">Application and initial call are always complimentary.</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-10 border border-slate-100 flex flex-col items-center text-center">
               <GraduationCap className="w-12 h-12 text-primary/20 mb-6" />
               <h4 className="text-lg font-bold text-primary font-serif mb-4">Admissions Support</h4>
               <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">Need assistance with your application? Our team is available to help.</p>
               <div className="space-y-2">
                 <p className="text-sm font-bold text-primary">operations@nexcellenceacademy.com</p>
                 <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Mon - Fri | 9am - 5pm EST</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  )
}
