"use client"
import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      source: 'contact_form'
    })
    setLoading(false)
    if (!error) {
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <Image 
          src="/images/leadership.png" 
          alt="Contact Us" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a192f]/80" />
        <div className="container relative z-10 pb-12">
           <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-secondary" />
              <h4 className="text-secondary font-bold uppercase tracking-widest text-sm">Get In Touch</h4>
            </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-serif uppercase tracking-tight">Contact Us</h1>
        </div>
      </section>

      <section className="py-12 container max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2 elevated-card p-10 md:p-12 bg-white">
            <h2 className="text-xl md:text-2xl font-bold text-primary font-serif mb-8 italic">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-none focus:border-secondary outline-none transition-colors text-sm"
                    placeholder="e.g. Dr. Jane Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-none focus:border-secondary outline-none transition-colors text-sm"
                    placeholder="name@university.edu"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">How Can We Help?</label>
                <textarea 
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-none focus:border-secondary outline-none transition-colors text-sm"
                  placeholder="Tell us about your research or institutional goals..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="h-16 px-12 bg-primary text-white hover:bg-secondary hover:text-primary transition-all font-bold uppercase tracking-widest rounded-none border-b-4 border-black/20" disabled={loading}>
                {loading ? 'Processing...' : 'Submit Inquiry'}
              </Button>

              {success && (
                <div className="p-6 bg-green-50 text-green-800 border-l-4 border-green-500 font-medium rounded-xl">
                  Success! Your message has been sent. Our admissions team will respond within 48 hours.
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-[#192f59] p-10 text-white">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Our Office</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                    <p className="text-sm">operations@nexcellenceacademy.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-secondary shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Response Time</p>
                    <p className="text-sm">Mon-Fri: 9am - 5pm EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-10 border border-muted-foreground/10 text-center">
              <MessageSquare className="w-12 h-12 text-secondary mx-auto mb-6 opacity-30" />
              <h4 className="text-lg font-bold text-primary font-serif mb-4 italic">Social Media</h4>
              <p className="text-xs text-muted-foreground leading-relaxed uppercase tracking-widest">Connect with us on LinkedIn for latest academic insights.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
