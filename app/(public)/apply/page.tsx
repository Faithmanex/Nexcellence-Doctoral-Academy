"use client"
import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShieldCheck, GraduationCap, Star } from 'lucide-react'

export default function ApplyPage() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    role_type: '',
    interested_in: '',
    message: '',
    source: 'apply_page'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contact_submissions').insert([formData])
    setLoading(false)
    if (!error) {
      setSuccess(true)
      // Reset form
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        role_type: '', 
        interested_in: '', 
        message: '', 
        source: 'apply_page' 
      })
    } else {
      console.error('Error submitting application:', error)
      alert("Submission failed. Please try again.")
    }
  }

  const serviceCategories = [
    "Doctoral Academy (90-Day / Strategy)",
    "Faculty Advancement",
    "Academic Leadership",
    "Curriculum Design",
    "Dissertation & Publishing",
    "Book Publishing",
    "Elite Transformation Program"
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
            <div className="bg-white elevated-card p-10 md:p-16 border-t-8 border-t-secondary">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-primary font-serif mb-4 italic">Program Application Form</h2>
                <p className="text-slate-500 font-light">Please complete all fields below. Our admissions committee will review your application and respond within 1 business day to schedule your evaluation call.</p>
              </div>

              {success ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-xl mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-green-900">Application Received</h3>
                    </div>
                    <p className="text-green-800 leading-relaxed">
                      Thank you, {formData.name}. Your application has been successfully submitted to the Nexcellence Academy™ admissions team. 
                      <br /><br />
                      <strong>What happens next?</strong>
                      <br />
                      1. Our team will review your goals and current academic stage.
                      <br />
                      2. You will receive an email within 24 hours with a link to book your formal evaluation call.
                      <br />
                      3. During the call, we will determine the best-fit program for your trajectory.
                    </p>
                  </div>
                  <Button onClick={() => setSuccess(false)} variant="outline" className="font-bold uppercase tracking-widest px-8 h-14 border-primary text-primary hover:bg-primary hover:text-white rounded-none transition-all">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 font-sans">
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
                          {serviceCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
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

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={loading}
                      className="w-full sm:w-auto h-16 px-16 bg-primary text-white hover:bg-secondary hover:text-primary transition-all font-bold uppercase tracking-[0.2em] rounded-none border-b-4 border-black/20 text-sm"
                    >
                      {loading ? 'Processing Application...' : 'Submit Application'}
                    </Button>
                    <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-medium">By submitting, you agree to our terms of service and academic integrity policy.</p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Context Sidebar */}
          <div className="space-y-12">
            <div className="bg-[#0a192f] p-10 text-white rounded-none border-t-8 border-t-secondary shadow-2xl">
              <ShieldCheck className="w-12 h-12 text-secondary mb-8" />
              <h3 className="text-xl font-extrabold uppercase tracking-widest mb-6 font-serif italic">The Nexcellence Standard</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 font-light italic">"We only accept scholars and leaders we are certain we can advance. Every application is reviewed personally by Dr. Triplett to ensure cohort alignment and mission integrity."</p>
              
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
