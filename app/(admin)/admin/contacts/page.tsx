"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthGuard } from "@/components/AuthGuard"
import { 
  Bell, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Clock,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  message: string
  interested_in: string
  handled: boolean
  created_at: string
}

export default function ContactTriage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setContacts(data)
      setLoading(false)
    }
    fetchContacts()
  }, [])

  const handleMarkHandled = async (id: string) => {
    await supabase
      .from('contact_submissions')
      .update({ handled: true })
      .eq('id', id)
    
    setContacts(contacts.map(c => c.id === id ? { ...c, handled: true } : c))
  }

  return (
    <AuthGuard allowedRole="admin">
      <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-serif font-bold text-primary">Inquiry Triage</h1>
              <p className="text-slate-500 font-medium">Review and respond to incoming academic consultations</p>
            </div>
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
              <Button variant="ghost" size="sm" className="bg-slate-100 text-primary font-bold h-9 px-4 rounded-lg">Pending</Button>
              <Button variant="ghost" size="sm" className="text-slate-400 font-bold h-9 px-4 rounded-lg">Archived</Button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {contacts.length > 0 ? contacts.map((contact) => (
              <div key={contact.id} className={`bg-white rounded-2xl border ${contact.handled ? 'border-slate-100 opacity-60' : 'border-slate-200 shadow-sm'} overflow-hidden flex flex-col group`}>
                <div className="p-6 space-y-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-bold text-primary text-lg">{contact.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {contact.handled ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Mail className="w-4 h-4 text-slate-300" />
                      <span className="font-medium truncate">{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-300" />
                        <span className="font-medium">{contact.phone}</span>
                      </div>
                    )}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Interest</p>
                      <p className="text-sm font-bold text-primary">{contact.interested_in || 'General Consultation'}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry Message</p>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-4 italic">
                      "{contact.message || 'No message provided.'}"
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                  <Button 
                    onClick={() => handleMarkHandled(contact.id)}
                    disabled={contact.handled}
                    size="sm" 
                    className={`flex-1 ${contact.handled ? 'bg-slate-200 text-slate-400' : 'bg-primary text-white hover:bg-primary/90'} h-10 rounded-xl font-bold uppercase tracking-widest text-[10px]`}
                  >
                    {contact.handled ? 'Handled' : 'Mark as Handled'}
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200 text-slate-400 hover:text-secondary group">
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Bell className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-400 font-serif italic text-lg">No pending inquiries at the moment.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </AuthGuard>
  )
}
